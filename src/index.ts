#!/usr/bin/env node
import { Command } from "commander";
import * as readline from "readline";

const program = new Command();

program
  .argument("<message>", "string to log")
  .option("-c, --capitalize", "Capitalize the message")
  .action((message: string, opts: { capitalize?: boolean }) => {
    if (opts.capitalize) {
      console.log(message.toUpperCase());
    } else {
      console.log(message);
    }
  })
  .description("Say hello");

program
  .command("add <numbers...>")
  .description("Add numbers and log the total")
  .action((numbers: string[]) => {
    const numArray = numbers.map(Number);
    const total = numArray.reduce((a, b) => a + b, 0);
    console.log(`Total: ${total}`);
  });

program
  .command("get-max-number <numbers...>")
  .description("Get the maximum number from input")
  .action((numbers: string[]) => {
    const numArray = numbers.map(Number);
    const max = Math.max(...numArray);
    console.log(`Max: ${max}`);
  });

program
  .command("chat")
  .description("Talk to a simple CLI chatbot")
  .action(() => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function askChat() {
      rl.question("You: ", (input) => {
        if (input.toLowerCase() === "exit") {
          console.log("Chatbot: Goodbye!");
          rl.close();
        } else {
          console.log(`Chatbot: You said '${input}'.`);
          askChat();
        }
      });
    }

    console.log("Start chatting with the CLI chatbot (type 'exit' to quit):");
    askChat();
  });

program.parse(process.argv);
