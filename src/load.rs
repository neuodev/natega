use std::fs;

use crate::result::StudentResult;

const FILES: [&str; 5] = [
    "300000.json",
    "937001.json",
    "500000.json",
    "900000.json",
    "700000.json",
];

pub fn load_results() -> Vec<StudentResult> {
    let mut all = vec![];

    for file in FILES {
        let json_str = fs::read_to_string(format!("./data/{file}")).unwrap();
        let mut results: Vec<StudentResult> = serde_json::from_str(json_str.as_str()).unwrap();
        all.append(&mut results)
    }

    all
}