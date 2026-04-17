function GeneCard({name, description, summary}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{summary}</p>
        </div>
    )
}

export default GeneCard