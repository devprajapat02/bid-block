import React from 'react'

export default function ItemPage() {
  return (
    <>
    <div  style={{backgroundColor: "whitesmoke", width: "80vw", height: "80vh", marginTop: "10vh", marginLeft: "10vw"}}>
        <div className='row'>
            <div className='col' style={{width: "40vw", height: "80vh"}}>
                <img width="100%" height="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKMEhy8-UzW5IylOvuqyvXtkcMJNQc8XKf3fK_J4nu1w&usqp=CAU&ec=48600113" />
            </div>

            <div className='col' style={{display: "flex"}}>
                <button className='btn bg-success text-light' style={{justifyContent: "flex-end", display: "flex"}}>Bid</button>
            </div>
        </div>
    </div>
    </>
  )
}
