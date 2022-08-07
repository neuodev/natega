mod result;
use crate::result::get_start_seat_no;
use actix_files as fs;
use actix_web::{App, HttpServer};
use colored::Colorize;
use result::{save_batch, StudentResult};
use std::thread;
use std::env;

#[actix_web::main]
async fn main() {
    let handler = thread::spawn(|| {
        let end = env::var("RUST_END")
            .expect("Missing end number")
            .parse::<i32>()
            .unwrap();
        let filename = format!("./data/{}.json", end);
        let mut start = get_start_seat_no(filename.as_str());

        println!(
            "{}",
            format!("Stat: {start} -> End: {end}").bold().on_cyan()
        );

        let mut results = vec![];
        loop {
            let res = StudentResult::fetch(start).unwrap_or_else(|e| {
                println!("{}", format!("{}", start).bold().on_red());
                println!("{}", e);
                String::new()
            });

            start += 1;

            if res.is_empty() {
                continue;
            }

            if let Ok(result) = StudentResult::parse(res.as_str()) {
                println!(
                    "stduent: {} - {}",
                    format!("{}", start).bold().green(),
                    format!("{}%", result.percentage).bold().green()
                );

                results.push(result);
            } else {
                println!(
                    "{}",
                    format!("{} invalid response", start).bold().on_bright_red()
                );
            }

            if start % 10 == 0 {
                save_batch(format!("./data/{end}.json").as_str(), &mut results);
            }

            if start >= end {
                println!("{}", format!("Done").bold().on_green());
                break;
            }
        }
    });

    let should_run_server = env::var("RUST_RUN_SERVER")
        .unwrap()
        .parse::<bool>()
        .unwrap();

    if should_run_server == true {
        println!("Server running at 0.0.0.0:8080");
        HttpServer::new(|| {
            App::new().service(fs::Files::new("/static", "./data").show_files_listing())
        })
        .bind("0.0.0.0:8080")
        .unwrap()
        .run()
        .await
        .unwrap();
    }

    handler.join().unwrap();
}
