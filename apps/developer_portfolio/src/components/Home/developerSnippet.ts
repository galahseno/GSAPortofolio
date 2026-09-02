export type TokenColor = "keyword" | "class" | "property" | "string" | "function" | "punctuation";

export interface SnippetToken {
  text: string;
  color?: TokenColor;
}

export type SnippetLine = SnippetToken[];

export const DEVELOPER_SNIPPET: SnippetLine[] = [
  [
    { text: "val ", color: "keyword" },
    { text: "developer " },
    { text: "= ", color: "punctuation" },
    { text: "Developer", color: "class" },
    { text: "(", color: "punctuation" },
  ],
  [
    { text: "  name ", color: "property" },
    { text: "= ", color: "punctuation" },
    { text: '"Galah Seno Adjie"', color: "string" },
    { text: ",", color: "punctuation" },
  ],
  [
    { text: "  expertise ", color: "property" },
    { text: "= ", color: "punctuation" },
    { text: "listOf", color: "function" },
    { text: "(", color: "punctuation" },
    { text: '"Kotlin/Compose Multiplatform"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Android"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"iOS"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Flutter"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"React Native"', color: "string" },
    { text: "),", color: "punctuation" },
  ],
  [
    { text: "  skills ", color: "property" },
    { text: "= ", color: "punctuation" },
    { text: "listOf", color: "function" },
    { text: "(", color: "punctuation" },
    { text: '"Kotlin"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Swift"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Dart"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Typescript"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"NodeJS"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Spring Boot"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"PostgreSQL"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"CI/CD"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Git"', color: "string" },
    { text: "),", color: "punctuation" },
  ],
  [
    { text: "  focuses ", color: "property" },
    { text: "= ", color: "punctuation" },
    { text: "listOf", color: "function" },
    { text: "(", color: "punctuation" },
    { text: '"Mobile Native"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Multiplatform/Crossplatform"', color: "string" },
    { text: ", ", color: "punctuation" },
    { text: '"Fullstack"', color: "string" },
    { text: ")", color: "punctuation" },
  ],
  [{ text: ")", color: "punctuation" }],
];
