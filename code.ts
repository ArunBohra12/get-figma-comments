const figmaToken = "figd_ViShl14nCOOtY-731vQPGNL6yOISWuamm2_f7qCB";

figma.showUI(__html__);

figma.ui.onmessage = async (message) => {
  if (message !== "download-comments") return;

  console.log("arun");
  figma.notify("Getting all the comments", { timeout: 3000 });
  const comments = await getAllComments();

  figma.ui.postMessage(comments);
};

// Define the plugin function
async function getAllComments() {
  // Load the required fonts
  await figma.loadFontAsync({ family: "Mulish", style: "Regular" });

  const currentFileId = figma.fileKey;

  // curl -H 'X-FIGMA-TOKEN: <personal access token>' 'https://api.figma.com/v1/files/:file_key/comments'

  const request = await fetch(
    `https://api.figma.com/v1/files/${currentFileId}/comments`,
    {
      headers: {
        "X-FIGMA-TOKEN": figmaToken,
      },
    }
  );

  const comments = await request.json();

  return comments;

  // const csv = customers
  //   .map((customer) => {
  //     return `"${customer.name}","${customer.email}","${customer.phone}"`;
  //   })
  //   .join("\n");

  // const blob = new Blob([csv], { type: "text/csv" });
  // const url = URL.createObjectURL(blob);

  // const link = document.createElement("a");
  // link.href = url;
  // link.download = "customers.csv";

  // document.body.appendChild(link);
  // link.click();
}

// Run the plugin function when the plugin is launched
// getAllComments();
