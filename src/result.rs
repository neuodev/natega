use colored::Colorize;
use select::document::Document;
use select::node::Node;
use select::predicate::Attr;
use serde::{Deserialize, Serialize};
use std::path::Path;
use std::{fs, time::Duration};


#[derive(Debug, Serialize, Deserialize)]
pub struct StudentResult {
    name: String,
    school: String,
    org: String,
    status: String,
    kind: String,
    branch: String,
    arabic: String,
    first_lang: String,
    second_lang: String,
    pure_math: String,
    applied_math: String,
    history: String,
    geography: String,
    philosophy: String,
    pychology: String,
    chemistry: String,
    biology: String,
    geology: String,
    physics: String,
    total: String,
    religious_edu: String,
    national_edu: String,
    eco_and_stats: String,
    seat_no: String,
    pub percentage: String,
}

impl StudentResult {
    pub fn fetch(seat_no: i32) -> Result<String, String> {
        let params = [("seating_no", seat_no)];
        let client = reqwest::blocking::ClientBuilder::new()
            .timeout(Duration::from_secs(60))
            .build()
            .unwrap();
        let res = match client
            .post("https://natega.youm7.com/Home/Result")
            .form(&params)
            .send()
        {
            Ok(res) => res,
            Err(e) => return Err(format!("{e}")),
        };
        let txt = match res.text() {
            Ok(txt) if txt.as_str().contains("رقم الجلوس غير صحيح") => {
                return Err("Incorrect seat number".to_string())
            }
            Ok(txt) => txt,
            Err(e) => return Err(format!("{e}").to_string()),
        };

        Ok(txt)
    }

    pub fn parse(html: &str) -> Result<StudentResult, String> {
        let doc = Document::from(html);

        let result_nodes = doc.find(Attr("class", "resultItem"));
        let summary_nodes = doc.find(Attr("class", "col resultItem"));
        let mut result = vec![];
        for node in result_nodes {
            let nodes = node.children().collect::<Vec<Node>>();
            let value = nodes[nodes.len() - 2].text();
            result.push(value.trim().to_string());
        }

        for node in summary_nodes {
            let children = node.children().collect::<Vec<Node>>();
            let value = children[children.len() - 2].text();
            result.push(value.trim().to_string())
        }

        if result.len() != 26 {
            return Err(format!("invalid response")
                .bold()
                .on_bright_red()
                .to_string());
        }

        Ok(StudentResult {
            name: result[0].clone(),
            school: result[1].clone(),
            org: result[2].clone(),
            status: result[3].clone(),
            kind: result[4].clone(),
            branch: result[5].clone(),
            arabic: result[6].clone(),
            first_lang: result[7].clone(),
            second_lang: result[8].clone(),
            pure_math: result[9].clone(),
            history: result[10].clone(),
            geography: result[11].clone(),
            philosophy: result[12].clone(),
            pychology: result[13].clone(),
            chemistry: result[14].clone(),
            biology: result[15].clone(),
            geology: result[16].clone(),
            applied_math: result[17].clone(),
            physics: result[18].clone(),
            total: result[19].clone(),
            religious_edu: result[20].clone(),
            national_edu: result[21].clone(),
            eco_and_stats: result[22].clone(),
            seat_no: result[23].clone(),
            percentage: result[25].trim_end_matches("%").trim().to_string(),
        })
    }
}

pub fn save_batch(filename: &str, batch: &mut Vec<StudentResult>) {

    if Path::new("./data").exists() == false {
        fs::create_dir("./data").unwrap();
    }
    
    let path = Path::new(filename);
    if path.exists() == false {
        fs::write(path, serde_json::to_string(&batch).unwrap()).unwrap();
    } else {
        let mut json_string = fs::read_to_string(filename).expect("Unable to read file");
        if json_string.is_empty() {
            json_string = "[]".to_string()
        }
        let mut old_results: Vec<StudentResult> =
            serde_json::from_str(json_string.as_str()).unwrap();

        old_results.append(batch);
        let to_save = serde_json::to_string(&old_results).unwrap();
        fs::write(path, to_save).unwrap();
    }

    println!("{}", format!("Saved {}", filename).bold().on_green())
}
