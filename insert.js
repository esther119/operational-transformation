function insertCharacter(text, position, character) {
  if (position < 0 || position > text.length) {
    console.error("Invalid position.");
    return text;
  }
  return text.slice(0, position) + character + text.slice(position);
}

// Example usage:
const originalText = "Hello World";
const newText = insertCharacter(originalText, 11, "-");
console.log(newText); // Output: "Hello- World"
