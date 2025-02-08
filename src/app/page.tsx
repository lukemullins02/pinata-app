"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState(""); // State to capture the input value

  // File types to allow (PDF, PNG, JPEG, JPG)
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected");
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const ipfsUrl = await uploadRequest.json();
      setUrl(ipfsUrl);

      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0];

    if (selectedFile) {
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null); // Clear any previous errors
      } else {
        setFile(null);
        setError(
          "Invalid file type. Only PDF, PNG, JPEG, and JPG are allowed."
        );
      }
    }
  };

  const userInput = () => {
    const userInputValue = (
      document.getElementById("userinput") as HTMLInputElement
    )?.value;
    setInput(userInputValue);
  };

  return (
    <main className="w-full min-h-screen bg-cover bg-center bg-[url('/recipeBook.jpg')] flex flex-col justify-center items-center p-6 relative">
      <div className="w-4/5 h-4/5 grid grid-cols-2 gap-8 bg-white  p-10 rounded-lg shadow-lg">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h1 className="text-4xl font-bold text-amber-600">Recipe Storage</h1>
          <input
            type="file"
            className="w-72 px-6 py-3 bg-white text-black text-lg font-semibold rounded-lg shadow-md border border-gray-300 transition file:bg-amber-600 file:border-none file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer file:shadow-md file:hover:bg-amber-700"
            onChange={handleChange}
            accept="application/pdf, image/png, image/jpeg"
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            className="w-72 px-6 py-3 bg-amber-600 text-white text-lg font-semibold rounded shadow-md hover:bg-amber-700 transition"
            type="button"
            disabled={uploading}
            onClick={uploadFile}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          <input
            id="userinput"
            className="w-72 px-4 py-3 text-black border border-gray-300 rounded shadow-md"
            placeholder="Enter CID"
          />
          <button
            className="w-72 px-6 py-3 bg-amber-600 text-white text-lg font-semibold rounded shadow-md hover:bg-amber-700 transition"
            onClick={userInput}
          >
            Return CID File
          </button>
        </div>

        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-md">
          {url && (
            <div className="flex flex-col items-center">
              <img
                src={url}
                alt="Uploaded"
                className="w-64 h-64 object-cover rounded-lg border border-gray-300 shadow-md"
              />
              <div className="flex items-start mt-2">
                <p className="text-gray-700">{url.substring(48)}</p>
              </div>
            </div>
          )}

          {input && (
            <div className="mt-4">
              <span className="text-gray-700 font-semibold">Link to CID: </span>
              <a
                href={`https://brown-secure-emu-26.mypinata.cloud/ipfs/${input}`}
                target="_blank"
                className="text-blue-600 underline"
              >
                {input}
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
