const message = document.getElementById("message");

const appendHeading = (text) => {
  const heading = document.createElement("h2");
  heading.textContent = text;
  message.appendChild(heading);
};

const appendParagraph = (text) => {
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.appendChild(paragraph);
};

const clipboard = document.getElementById("clipboard");

const copyTextToClipboard = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const isValidUrl = (text) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

const getUrlsFromClipboard = () => {
  const textarea = document.createElement("textarea");
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("paste");
  const text = textarea.value;
  document.body.removeChild(textarea);
  return text.split("\n").filter(isValidUrl);
};

const clipboardUrls = getUrlsFromClipboard();
document.getElementById("tab-count").textContent = clipboardUrls.length;
if (clipboardUrls.length !== 0) {
  document.getElementById("paste").disabled = false;
}

document.getElementById("paste").addEventListener("click", () =>
  clipboardUrls.forEach((url) => {
    chrome.tabs.create({ url });
  })
);

const tabs = await chrome.tabs.query({
  highlighted: true,
});

copyTextToClipboard(tabs.map((tab) => tab.url).join("\n"));
appendHeading("Copied!");
appendParagraph(
  `${tabs.length} ${tabs.length === 1 ? "tab" : "tabs"} selected`
);
