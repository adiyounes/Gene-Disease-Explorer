import { useState } from "react"
import GeneCard from "./GeneCard"
import DetailPanel from "./DetailPanel"

function App(){
  const [query, setQuery] = useState('')
  const [genes, setGenes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selectedGene, setSelectedGene] = useState(null)

  const [savedGenes, setSavedGenes] = useState([])

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSearch()
  } 

  function handleSave(gene) {
    setSavedGenes(prev => [...prev, gene])
  }

  function handleRemove(uid) {
    setSavedGenes(savedGenes => savedGenes.filter(gene=>gene.uid !==uid))
  }

  async function handleSearch() {
    if (!query.trim()) return
    setSelectedGene(null)
    setLoading(true)
    setError(null)
    setGenes([])
    try{
      const res = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${encodeURIComponent(query)}[Gene Name]&retmax=30&retmode=json`)
      const data = await res.json()
      const ids = data.esearchresult.idlist
      
      if (ids.length === 0) {
        setError("No genes found")
        return
      }

      const summaryRes = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=gene&id=${ids.join(',')}&retmode=json`
      )
  
      const summaryData = await summaryRes.json()
      
      const genes = ids
        .map(id => summaryData.result[id])
        .filter(gene => gene.summary && gene.summary.length > 0) 
      setGenes(genes)
    } catch(err) {
      setError("Something went wrong, please try again")
    } finally {
      setLoading(false)
    }

    }
  return (
    <div className="app">
      <h1>Gene Scope</h1>
      <p className="subtitle">Search genes and explore disease assiociations</p>
      <div className="search-row">
        <input type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a gene name..."
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {loading && <p className="status">Searching...</p>}
      {error && <p>{error}</p>}
      {
        selectedGene && (
          <DetailPanel gene={selectedGene}
            savedGenes={savedGenes}
            onSave={handleSave}
            onRemove={handleRemove}
          />
        )
       }
      {genes.map(gene => (
        <GeneCard
          key={gene.uid}
          name={gene.name}
          description={gene.description}
          summary={gene.summary}
          onClick={() => setSelectedGene(gene)}
        />
       ))}
    </div>
  )
}

export default App