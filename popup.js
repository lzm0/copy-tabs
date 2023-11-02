const appendHeading = (text) => {
  const heading = document.createElement("h2");
  heading.textContent = text;
  document.body.appendChild(heading);
};

const appendParagraph = (text) => {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  document.body.appendChild(paragraph);
};

const copyTextToClipboard = (text) => {
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  copyFrom.blur();
  document.body.removeChild(copyFrom);
};

const tabs = await chrome.tabs.query({
  highlighted: true,
});

copyTextToClipboard(tabs.map((tab) => tab.url).join("\n"));
appendHeading("Copied!");
appendParagraph(
  `${tabs.length} ${tabs.length === 1 ? "tab" : "tabs"} selected`
);
