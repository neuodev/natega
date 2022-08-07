mod result;
use colored::Colorize;
use result::{save_batch, StudentResult};
use std::{env, fs, process};
use std::path::Path;

fn main() {
    let mut start = env::var("RUST_START")
        .expect("Missing start number")
        .parse::<i32>()
        .unwrap();

    let end = env::var("RUST_END")
        .expect("Missing end number")
        .parse::<i32>()
        .unwrap();

    println!("{}", format!("Stat: {start} -> End: {end}").bold().on_cyan());

    let output_path = Path::new("./data");
    if output_path.exists() == true {
        fs::remove_dir_all(output_path).expect("Unable to delete output data dir.",);
    }

    let mut results = vec![];
    loop {
        let res = StudentResult::fetch(start).unwrap_or_else(|e| {
            println!("{}", format!("{}", start).bold().on_red());
            println!("{}", e);
            String::new()
        });

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

        start += 1;

        if start % 10 == 0 {
            save_batch(format!("./data/{end}.json").as_str(), &mut results);
        }

        if start >= end {
            println!("{}", format!("Done").bold().on_green());
            process::exit(0);
        }
    }
}
