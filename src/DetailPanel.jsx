import { useState, useEffect } from "react";

function DetailPanel({gene, savedGenes, onSave, onRemove}){
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

    const isSaved = savedGenes.some(g=>g.uid===gene.uid)

    useEffect(()=>{
        if (!gene) return

        async function fetchArticles() {
            setLoading(true)
            try {
                const searchRes = await fetch(
                    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(gene.name)}[Gene Name] disease&retmax=5&retmode=json`
                )

                const searchData = await searchRes.json()
                const ids = searchData.esearchresult.idlist

                if (ids.length === 0) {
                    setArticles([])
                    return
                }

                setArticles(ids)
                
            }catch (err) {
                console.error(err)
            }finally {
                setLoading(false)
            }
        }
        fetchArticles()
    }, [gene?.uid])

    return (
        <div>
            <h2>{gene.name}</h2>
            <button onClick={() => isSaved ? onRemove(gene.uid) : onSave(gene)}>
                {isSaved ? "Remove" : "Save"}
            </button>
            <p>{gene.summary}</p>
            <h3>Related Research</h3>
            {loading && <p>Loading articles</p>}
            {articles.map(id =>
                <div key={id}>
                    <a href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`} target="_blank" rel="noopener noreferrer">
                        PubMed article {id} --
                    </a>
                </div>
            )}
        </div>
    )
}

export default DetailPanel