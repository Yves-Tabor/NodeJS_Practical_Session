import { readFile } from "fs/promises";

async function readAndParseJSON(filePath: string): Promise<unknown> {
    try {
        const contents = await readFile(filePath, "utf-8");
        return JSON.parse(contents);
    } catch (error: any) {
        if (error.code === "ENOENT") {
            throw new Error("File not found: " + filePath);
        }

        if (error instanceof SyntaxError) {
            throw new Error('Invalid JSON in file: ' + filePath);
        }

        throw error;
    }
}

async function main() {
    try {
        const data = await readAndParseJSON("data.json");
        console.log("Parsed data: ", data);
    } catch (error) {
        console.log((error as Error).message);
    }
}

main();