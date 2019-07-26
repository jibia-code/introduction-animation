"use strict";

var fastestTypeSpeed = 50;
var slowestTypeSpeed = 150;
var resultsBoxStatus = "closed";
var loadedSectionId = null;
var wordCompletionNodes = [];

function sleep(milliseconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, milliseconds);
  });
}

function getRandomMilliseconds() {
  return (
    Math.floor(Math.random() * (slowestTypeSpeed - fastestTypeSpeed)) +
    fastestTypeSpeed
  );
}

function removeAllChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function preloadResultSection(sectionId) {
  if (loadedSectionId !== null) {
    var previousSectionElement = document.getElementById(loadedSectionId);
    previousSectionElement.classList.remove("loaded");
  }

  var sectionElement = document.getElementById(sectionId);
  sectionElement.classList.add("loaded");
  loadedSectionId = sectionId;
  console.debug(`Preloaded results section with the '${sectionId}' id.`);
}

function freezeCaret() {
  var caretElement = document.getElementById("caret");
  caretElement.classList.add("frozen");
  console.debug("Froze caret.");
}

function unfreezeCaret() {
  var caretElement = document.getElementById("caret");
  caretElement.classList.remove("frozen");
  console.debug("Unfroze caret.");
}

function openResultsBox() {
  var resultsBoxElement = document.getElementById("results-box");
  resultsBoxElement.classList.remove("closed");
  resultsBoxStatus = "open";
  console.debug("Opened results box.");
}

function closeResultsBox() {
  var resultsBoxElement = document.getElementById("results-box");
  resultsBoxElement.classList.add("closed");
  resultsBoxStatus = "closed";
  console.debug("Closed results box.");
}

function deleteLastLetterFromSearchContent() {
  var inputTextElement = document.getElementById("input-text");
  inputTextElement.innerText = inputTextElement.innerText.slice(0, -1);
  if (inputTextElement.innerText.length === 0 && resultsBoxStatus === "open") {
    closeResultsBox();
  }
  console.debug("Deleted last letter from search content.");
}

async function deleteAllSearchContent() {
  var inputTextElement = document.getElementById("input-text");
  var searchContentLength = inputTextElement.innerText.length;
  freezeCaret();
  for (let index = 0; index < searchContentLength; index++) {
    await deleteLastLetterFromSearchContent();
    if (index !== searchContentLength - 1) {
      await sleep(fastestTypeSpeed);
    }
  }
  unfreezeCaret();
  console.debug("Deleted all search content.");
}

function writeLetterInSearch(letter) {
  var inputTextElement = document.getElementById("input-text");
  inputTextElement.innerText += letter === " " ? "\u00A0" : letter;
  if (inputTextElement.innerText.length > 0 && resultsBoxStatus === "closed") {
    openResultsBox();
  }
  console.debug(`Added letter '${letter}' to search.`);
}

function addSpanToParentNode(parentNode, text, className) {
  var spanElement = document.createElement("span");
  spanElement.innerText = text;
  spanElement.classList.add(className);
  parentNode.appendChild(spanElement);
  console.debug("Added span to parent node.");
}

function updateResultsCompletion(currentText, completions) {
  if (completions !== undefined) {
    var completionElement = document.getElementById("completion-list");
    removeAllChildren(completionElement);
    for (var completion of completions) {
      var listElement = document.createElement("li");
      listElement.classList.add("completion-list-item");
      addSpanToParentNode(listElement, currentText, "written");
      addSpanToParentNode(
        listElement,
        completion.slice(currentText.length),
        "suggested"
      );
      completionElement.appendChild(listElement);
    }
  }
}

async function writeStringInSearch(word, completions) {
  freezeCaret();
  for (var index = 0; index < word.length; index++) {
    var letter = word[index];
    await writeLetterInSearch(letter);
    if (completions !== undefined) {
      updateResultsCompletion(word.slice(0, index + 1), completions);
    }
    await sleep(getRandomMilliseconds());
  }
  unfreezeCaret();
  console.debug(`Wrote string '${word}' in search.`);
}

async function swapCustomizableSections() {
  var completionSection = document.getElementById("completion-section");
  var productsSection = document.getElementById("products-section");
  completionSection.classList.toggle("swapped");
  productsSection.classList.toggle("swapped");
  console.log("Swapped customizable section positions.");
}

function animationLoop() {
  return new Promise(async function(resolve) {
    await sleep(1000);
    await preloadResultSection("customizable");
    await writeStringInSearch("customizable");
    await swapCustomizableSections();
    await sleep(2000);
    await deleteAllSearchContent();

    await sleep(1000);
    await preloadResultSection("word-completion");
    await writeStringInSearch("auto", [
      "autocomplete",
      "autobanden",
      "automatische incasso"
    ]);
    await sleep(2000);
    await deleteAllSearchContent();

    await sleep(1000);
    await preloadResultSection("spelling-checker");
    await writeStringInSearch("hgoree covnertie");
    await sleep(2000);
    await deleteAllSearchContent();

    resolve();
  });
}

function runIntroAnimationLoop() {
  console.debug("Starting intro animation loop.");
  animationLoop().then(function(result) {
    console.debug("Closed intro animation loop.");
    runIntroAnimationLoop();
  });
}

document.addEventListener("DOMContentLoaded", runIntroAnimationLoop);
