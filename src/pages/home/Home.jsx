import { useState } from 'react';
const Home = () => {
    let [reqRes, setReqRes] = useState([])
    const [loading, setLoading] = useState(false);
    // const inDiv = (type, text) => {
    //     if (type == "input") {
    //         let div = document.createElement("div");
    //         let p = document.createElement("p");
    //         p.classList = "bg-gray-700 rounded-md p-3 text-white float-right w-fit";
    //         p.innerText = text;
    //         div.appendChild(p);
    //         document.getElementById("input").appendChild(div)
    //     } else {
    //         document.getElementById("input").innerHTML += `
    //             <div >
    //                   <p className="bg-gray-700 rounded-md p-3 text-white float-left w-fit">${text}</p>
    //               </div>
    // `
    //     }

    // }
    const submitQuery = (e) => {
        setLoading(loading => true);
        let timeout = setTimeout(() => {
            document.getElementById("loading").innerText = "plese wait..."
        }, 2000)
        e.preventDefault();
        let form = e.target;
        let textInput = form.text.value;
        let queryObj = {
            type: 'query',
            text: textInput,
        }
        setReqRes((reqRes) => {
            return [...reqRes, queryObj]
        });
        // inDiv("input", textInput)
        fetch("http://localhost:5000/ask", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ question: textInput })
        }).then(res => res.json()).then(data => {
            clearTimeout(timeout);
            document.getElementById("loading").innerText = "Loading..."
            setLoading(loading => false)
            // inDiv("output", data.response)
            setReqRes(reqRes => {
                return [...reqRes, { type: "answer", text: data.response }]
            })
        })
        form.reset()
    }

    return (
        <div className='flex h-screen w-full overflow-y-scroll'>
            <div className='h-screen w-20 bg-gray-800'>

            </div>
            <div title="text input" className='w-full mx-auto bg-gray-900 h-full relative'>
                {/* <div className='h-16 bg-slate-700 fixed top-0 w-full '></div> */}
             
             
                    <div id='input' className=' flex flex-col gap-3 h-full justify-end py-4 overflow-y-scroll'>

                        {
                            reqRes.map((ele, index) => <div key={index}>
                                <p className={`bg-gray-700 rounded-md p-3 text-white ${ele.type == "query" ? "float-right" : "float-left"} w-fit`}>{ele.text}</p>
                            </div>
                            )

                        }
                        <p className={`text-white border-2 self-start p-2 rounded ${loading ? "" : "hidden"}`} id='loading'>Loading...</p>
                    </div>
                    <form onSubmit={submitQuery} className='w-4/6 mx-auto flex absolute bottom-0 '>
                        <button type='button' className='border-t border-l border-b border-white p-3 font-semibold text-white text-xl  rounded-l-md'>📋</button>
                        <input type="text" name="text" id="text" placeholder='Enter your Query' className='w-full bg-gray-900 border-t border-b border-white  py-3 text-white focus:outline-none' />
                        <button type='button' className='border-t border-b border-white py-3 px-1 font-semibold text-white text-xl'>🎤</button>
                        <button type='button' className='border-t border-r border-b border-white py-3 px-1 font-semibold text-white text-xl  rounded-r-md'>✈</button>
                    </form>
               
               
            </div>
        </div >
    );
};

export default Home;

