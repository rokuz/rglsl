pub fn median(values: &[f64]) -> Option<f64> {
    let mut sorted: Vec<f64> = values.iter().copied().filter(|v| v.is_finite()).collect();
    if sorted.is_empty() {
        return None;
    }
    sorted.sort_by(f64::total_cmp);
    let middle = sorted.len() / 2;
    if sorted.len() % 2 == 1 {
        sorted.get(middle).copied()
    } else {
        let low = sorted.get(middle - 1)?;
        let high = sorted.get(middle)?;
        Some(f64::midpoint(*low, *high))
    }
}

pub fn geometric_mean(values: &[f64]) -> Option<f64> {
    if values.is_empty() || values.iter().any(|v| !v.is_finite() || *v <= 0.0) {
        return None;
    }
    let count = values.len() as f64;
    Some((values.iter().map(|v| v.ln()).sum::<f64>() / count).exp())
}

pub fn minimum(values: &[f64]) -> Option<f64> {
    values
        .iter()
        .copied()
        .filter(|v| v.is_finite())
        .min_by(f64::total_cmp)
}

pub fn ratio(numerator: f64, denominator: f64) -> Option<f64> {
    (denominator > 0.0 && numerator.is_finite() && denominator.is_finite())
        .then(|| numerator / denominator)
}

pub fn peak_rss_bytes(time_output: &str) -> Option<u64> {
    time_output.lines().rev().find_map(|line| {
        let line = line.trim();
        if let Some(number) = line.strip_suffix("maximum resident set size") {
            return number.trim().parse().ok();
        }
        let kibibytes = line.strip_prefix("Maximum resident set size (kbytes):")?;
        kibibytes
            .trim()
            .parse::<u64>()
            .ok()
            .map(|value| value * 1024)
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn close(a: Option<f64>, b: f64) -> bool {
        a.is_some_and(|a| (a - b).abs() < 1e-9)
    }

    #[test]
    fn median_of_odd_and_even_counts() {
        assert!(close(median(&[3.0, 1.0, 2.0]), 2.0));
        assert!(close(median(&[4.0, 1.0, 3.0, 2.0]), 2.5));
        assert!(close(median(&[7.0]), 7.0));
        assert_eq!(median(&[]), None);
    }

    #[test]
    fn median_ignores_non_finite_values() {
        assert!(close(median(&[f64::NAN, 5.0, 1.0, 3.0]), 3.0));
        assert_eq!(median(&[f64::NAN]), None);
    }

    #[test]
    fn median_is_robust_to_an_outlier() {
        assert!(close(median(&[10.0, 11.0, 12.0, 10.5, 1000.0]), 11.0));
    }

    #[test]
    fn geometric_mean_of_ratios() {
        assert!(close(geometric_mean(&[2.0, 0.5]), 1.0));
        assert!(close(geometric_mean(&[1.0, 4.0, 16.0]), 4.0));
        assert!(close(geometric_mean(&[3.0]), 3.0));
        assert_eq!(geometric_mean(&[]), None);
        assert_eq!(geometric_mean(&[1.0, 0.0]), None);
        assert_eq!(geometric_mean(&[1.0, -2.0]), None);
    }

    #[test]
    fn minimum_and_ratio() {
        assert!(close(minimum(&[3.0, 1.5, 2.0]), 1.5));
        assert_eq!(minimum(&[]), None);
        assert!(close(ratio(3.0, 2.0), 1.5));
        assert_eq!(ratio(1.0, 0.0), None);
    }

    #[test]
    fn peak_rss_from_bsd_time() {
        let output = "ERROR: x\n        0.01 real         0.00 user         0.00 sys\n            5341184  maximum resident set size\n                   0  average shared memory size\n";
        assert_eq!(peak_rss_bytes(output), Some(5_341_184));
    }

    #[test]
    fn peak_rss_from_gnu_time() {
        let output = "\tCommand being timed: \"glslang\"\n\tMaximum resident set size (kbytes): 2048\n\tExit status: 0\n";
        assert_eq!(peak_rss_bytes(output), Some(2_097_152));
        assert_eq!(peak_rss_bytes("no statistics"), None);
    }
}
