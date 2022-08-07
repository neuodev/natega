mod result;
use colored::Colorize;
use result::{save_batch, StudentResult};
use std::{env, process};

use crate::result::get_start_seat_no;

fn main() {
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
            process::exit(0);
        }
    }
}
