import React from 'react'

export default function ItemCard() {
  return (
    <div>
        <div className="card" style={{ width: "36rem", margin: "10px"}} onClick={() => {console.log("Clked!")}}>
        <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMEhy8-UzW5IylOvuqyvXtkcMJNQc8XKf3fK_J4nu1w&usqp=CAU&ec=48600113" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Product title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
        <div className="card-body">
          <a href="#" className="card-link">
            Card link
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
        </div>
        </div>

    </div>
  )
}
