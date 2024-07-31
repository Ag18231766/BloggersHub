export function Bar(){
    console.log('hi');
    return (
        <div className="h-20  flex justify-center items-center border-b border-gray-300">
            <div className="w-full">
                <div className="h-full  flex justify-between">
                    <div className="ml-14 flex justify-center">Blogging Website</div>
                    <div className="w-96 bg-green-600 mr-96">
                        <button>YourBlogs</button>
                        <button className="ml-4">Explore</button>
                    </div>
                    <div className="w-40 mr-14  flex justify-between">
                        <div><button>New</button></div>
                        <div><div className="h-8 w-8 rounded-full bg-gray-200"></div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}