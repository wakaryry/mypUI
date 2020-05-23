def read_lines(filename):
    lines = []
    item = ""
    with open(filename, 'r') as f:
        for line in f:
            line_str = line.strip()
            if line_str.startswith(".icon-"):
                item = line_str.split(":")[0][6:]
                item = "'" + item + "':"
            elif line_str.startswith("content:"):
                content = line_str.split(":")[1].strip().rstrip(";")
                content = content[:2] + "u" + content[2:]
                item += content + ','
                lines.append(item)
    return lines


def write_file(filename, lines):
    with open(filename, 'w') as w:
        for line in lines:
            w.write(line)
            w.write("\n")


if __name__ == '__main__':
    write_file("dist.txt", read_lines("css.txt"))
