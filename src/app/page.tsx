"use client";

import { useState } from "react";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "brown-secure-emu-26.mypinata.cloud",
});

const js = "";

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
    <main className="w-full min-h-screen bg-emerald-600 flex flex-col justify-center items-center p-6 relative">
      <h1 className="absolute mt-4 top-6 text-white text-4xl font-bold">
        Welcome to Recipe Storage!
      </h1>
      <h1 className="mb-8 text-white text-3xl font-bold">
        Upload recipes here
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
          <p>Success!</p>
        </div>
      )}

      <input id="userinput" className="px-4 py-2 mt-4 border rounded" />
      <button
        className="mt-2 px-6 py-2 bg-white text-black text-xl font-semibold rounded shadow-lg hover:bg-gray-100 transition-transform transform"
        onClick={userInput}
      >
        Return CID File
      </button>

      {input && (
        <a href={`https://brown-secure-emu-26.mypinata.cloud/ipfs/${input}`}>
          Link
        </a>
      )}
    </main>
  );
}
