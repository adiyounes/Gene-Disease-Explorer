import { useState } from "react"
import GeneCard from "./GeneCard"
import DetailPanel from "./DetailPanel"

function App(){
  const [query, setQuery] = useState('')
  const [genes, setGenes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selectedGene, setSelectedGene] = useState(null)

  function handleKeyDown(e) {
  if (e.key === 'Enter') handleSearch()
  } 

  async function handleSearch() {
    setLoading(true)
    setError(null)
    setGenes([])
    try{
      const res = await fetch(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term=${encodeURIComponent(query)}[Gene Name]&retmax=8&retmode=json`)
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
      
      const genes = ids.map(id => summaryData.result[id])
      setGenes(genes)
      //Object.values(summaryData.result).forEach(value => {
      //  console.log(value.summary)
      //});
    } catch(err) {
      setError("Something went wrong, please try again")
    } finally {
      setLoading(false)
    }

    }
  return (
    <div>
      <input type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Enter a gene name..."
      onKeyDown={handleKeyDown}
       />
       <button
       onClick={handleSearch}>
       Search
       </button>
       {loading && <p>Loading...</p>}
       {error && <p>{error}</p>}
       {
        selectedGene && (
          <DetailPanel gene={selectedGene}/>
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