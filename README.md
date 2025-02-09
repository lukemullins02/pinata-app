Title: Recipe Storage

Description: A next.js full stack app that takes in pdfs of recipes and images of those recipes and uploads them to IPFS database where they will be permanently stored. These recipes and images can be retrieved by using the CID generated from sending an item to the database. When an item is sent to the database, the app prints out the CID for said specific item.

Basic Goals: Upload data to Pinata Database and retrieve from it.

What we leared: We learned alot about dealing with an IPFS database. The uniqueness of the database due to it being decentralized. Which allows stuff to be stored on it forever without fear of deletion. We also grew in basic knowledge of crud operators such as POST and GET.

Problems faced: We had to learn about a databse that none of us had experience with. We did this by going through documentation and talking to the pinata devs. This helped us integrate the API and get our databse up and running.

Stack: Next.js, pinata, and tailwind.css

Tools: pinata API

Setup and run app:

Create .env.local file in the root directory and copy and paste the following inforamtion:

PINATA_JWT= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwODJhYTQ4Zi1jYzc2LTQ1MjktOWVjMC0yNTY4MzgyYTk0ODYiLCJlbWFpbCI6Imx1a2VqbXVsbGluc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYzhiYWI5YzZmOTIzZTc4NWIyMjgiLCJzY29wZWRLZXlTZWNyZXQiOiIzNTE2MzAxODczNDdkODQ2MDljNzc2YWFiZWU1Y2Q4ZTIyZTQ5NTBiM2NhZDQ5YWYzMDk3MWYxOWNhOTYzMWJhIiwiZXhwIjoxNzcwNTU3MjEwfQ.LZXxNGaybthjWtQ6VWNF9jWuOVRVcbWmKhjMtw3XV9U"

NEXT_PUBLIC_GATEWAY_URL= "brown-secure-emu-26.mypinata.cloud"

Install the following:

npm -i pinata

npm install - -save-dev @types/react

Run:

Use npm run dev command to start up website
