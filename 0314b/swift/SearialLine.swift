let data = """
HSBC
CIBC
RBC
"""

let lines = data.components(separatedBy: "\n")

for (index, line) in lines.enumerated() {
    print("\(index + 1): \(line)")
}
