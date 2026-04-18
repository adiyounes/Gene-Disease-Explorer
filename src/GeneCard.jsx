function GeneCard({name, description, summary, onClick}) {
    return (
        <div className="gene-card" onClick={onClick}>
            <h2>{name}</h2>
            <p className="org">{description}</p>
            <p>{summary}</p>
        </div>
    )
}

export default GeneCard