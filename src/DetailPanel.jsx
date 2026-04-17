import { useState, useEffect } from "react";

function DetailPanel({gene}){
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)

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

                const summaryRes = await fetch(
                    `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids.join(',')}&retmode=json`
                )
                const summaryData = await summaryRes.json()
                const articles = ids.map(id => summaryData.result[id])
                
                setArticles(articles)
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
            <p>{gene.summary}</p>
            <h3>Related Research</h3>
            {loading && <p>Loading articles</p>}
            {articles.map(article =>
                <div key={article.uid}>
                    <p>{article.title}</p>
                    <a href={`https://pubmed.ncbi.nlm.nih.gov/${article.uid}/`} target="_blank" rel="noopener noreferrer">
                        View on PubMed --
                    </a>
                </div>
            )}
        </div>
    )
}

export default DetailPanel