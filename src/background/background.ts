interface SpeedProfile {
  downloadThroughput: number;
  uploadThroughput: number;
}

interface SpeedProfiles {
  [key: string]: SpeedProfile;
}

const speedProfiles: SpeedProfiles = {
  slow: {
    downloadThroughput: (200 * 1024) / 8,
    uploadThroughput: (100 * 1024) / 8,
  },
  medium: {
    downloadThroughput: (1024 * 1024) / 8,
    uploadThroughput: (512 * 1024) / 8,
  },
  fast: {
    downloadThroughput: (5 * 1024 * 1024) / 8,
    uploadThroughput: (2.5 * 1024 * 1024) / 8,
  },
  unlimited: {
    downloadThroughput: -1,
    uploadThroughput: -1,
  },
};

async function detachDebugger(tabId: number): Promise<void> {
  try {
    console.log("Detaching debugger from tab:", tabId);
    await chrome.debugger.detach({ tabId });
    console.log("Debugger detached successfully");
  } catch (e) {
    console.log("Error while detaching debugger:", e);
  }
}

async function handleSpeedChange(speedType: string): Promise<{ success: boolean, error?: string }> {
  console.log("Starting speed change to:", speedType);
  
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  console.log("Current tab:", tab);

  if (!tab.id || tab.url?.startsWith("chrome://") || tab.url?.startsWith("chrome-extension://")) {
    console.log("Cannot modify Chrome internal pages");
    throw new Error("Cannot modify Chrome internal pages");
  }

  try {
    console.log("Attempting to attach debugger...");
    await chrome.debugger.attach({ tabId: tab.id }, "1.0");
    console.log("Debugger attached.");

    console.log("Enabling network tracking...");
    await chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");
    console.log("Network tracking enabled.");

    const conditions = speedProfiles[speedType];
    console.log("Setting network conditions:", conditions);
    
    await chrome.debugger.sendCommand(
      { tabId: tab.id },
      "Network.emulateNetworkConditions",
      {
        offline: false,
        latency: 100,
        downloadThroughput: conditions.downloadThroughput,
        uploadThroughput: conditions.uploadThroughput,
        connectionType: "cellular3g",
      }
    );

    console.log("Network conditions set successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error while handling speed change:", error);
    console.log("Attempting to detach debugger after error...");
    await detachDebugger(tab.id);
    console.log("Debugger detached after error.");
    throw error;
  }
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log("Received message:", request);
  if (request.action === "setSpeed") {
    handleSpeedChange(request.speed)
      .then(() => {
        console.log("Speed change successful");
        sendResponse({ success: true });
      })
      .catch((error) => {
        console.error("Speed change failed:", error);
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
