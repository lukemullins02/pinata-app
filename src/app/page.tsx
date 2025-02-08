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
    <main className="w-full min-h-screen bg-cover bg-center bg-[url(/recipeBook3.jpg)] flex flex-col justify-center items-center p-6 relative">
      <div className="bg-black bg-opacity-65 rounded px-20 py-20">
        <div className="flex flex-col justify-center items-center ">
          <h1 className="absolute mt-4 top-6 text-white bg-black rounded bg-opacity-65 py-2 px-4 text-4xl font-bold">
            Welcome to Recipe Storage!
          </h1>
          <input
            type="file"
            className="px-6 py-2 bg-white text-black text-xl font-semibold rounded shadow-lg hover:bg-gray-100 transition-transform transform"
            onChange={handleChange}
            accept="application/pdf, image/png, image/jpeg" // Restrict file types here
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            className="mt-4 px-6 py-2 bg-white text-black text-xl font-semibold rounded shadow-lg hover:bg-gray-100 transition-transform transform"
            type="button"
            disabled={uploading}
            onClick={uploadFile}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {url && (
            <div className="mt-6">
              <img
                src={url}
                alt="Uploaded"
                className="w-64 h-64 object-cover rounded-lg border border-gray-300 shadow-md"
              />
              <p>{url.substring(48)}</p>
            </div>
          )}
          </div>
          <div className="flex flex-col items-center justify-center">
          <input
            id="userinput"
            className="px-4 py-2 mt-4 text-black border rounded"
          />
          <button
            className="mt-2 px-6 py-2 bg-white text-black text-xl font-semibold rounded shadow-lg hover:bg-gray-100 transition-transform transform"
            onClick={userInput}
          >
            Return CID File
          </button>
        
          {input && (
            <a
              href={`https://brown-secure-emu-26.mypinata.cloud/ipfs/${input}`}
              target="_blank"
            >
              Link for CID: {input}
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
