function GeneCard({name, description, summary, onClick}) {
    return (
        <div onClick={onClick}>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{summary}</p>
        </div>
    )
}

export default GeneCard