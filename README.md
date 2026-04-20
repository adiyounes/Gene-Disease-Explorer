# GeneScope

A React app for gene research and disease assiociations using the NCBI data base

## Live demo

https://genescope-ten.vercel.app

## What it does

- Searches for a gene in the ncbi data base
- returns summaries of the gene searched
- it shows direct links to the aticles of related research

## Tech used
|Tech|Purpose|
|-----|------|
|React|UI library for building component based interfaces|
|Vite|Development environment and build tool|
|NCBI, REST API|free public api for accessing biomedical database|
|CSS|Custom styling|


## Concepts practiced

- useState, managing multiple pieces of UI state
- useEffect, fetching data when selected gene changes
- async/await and try/catch/finally,handling API requests
- Array methods like map(), filter(), some()

## How to run it

1. clone the repository
```
    git clone git@github.com:adiyounes/Gene-Disease-Explorer.git
```
2. Install dependencies
```
    cd gene-explorer
    npm install
```
3. launch the development server
```
    npm run dev
```
4. Open http://localhost:5173 on your browser

## API

This app uses the NCBI E-utilities API,a free public API that gives access to the National Center for Biotechnology Information databases.

two end points used:
- esearch, takes a gene name and returns matching gene IDs
- esummary, takes gene IDs and returns full gene data including name, description and summary
