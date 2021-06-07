import { useEffect, useState } from 'react';


export default function App() {
	const [memes, setMemes] = useState();
	const [top, setTop] = useState('');
	const [bottom, setBottom] = useState('');
	const [randomMeme, setRandomMeme] = useState(
		'https://i.imgflip.com/1h7in3.jpg'
	);

	useEffect(() => {
    // geting data from the meme API
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((res) => setMemes(res.data.memes));
	}, []);

	const handleClick = (e) => {
    //get random meme from the API
		e.preventDefault();
		const random = Math.floor(Math.random() * memes.length);
		console.log(random);
		const randomMeme = memes[random].url;
		setRandomMeme(randomMeme);
	};

  // const downloadMeme = (e) => {
  //   e.preventDefault()
   
  // }

  // upload own img and create meme
  const uploadMeme = (e) => {
    let img = e.target.files[0]
    setRandomMeme(URL.createObjectURL(img))
  }


	return (
		<div className="App">
			<div className="header">
				<img
					className="grinch"
					src="https://i.pinimg.com/originals/de/f8/2b/def82b024cf736fac0ee5f28d441fb62.gif"
					alt=""
				/>
			</div>
			<div className="wrapper">
				<form className='form'>
					<input
						type="text"
						placeholder="Top of the Page"
						onChange={(e) => setTop(e.currentTarget.value)}
					/>
					<input
						type="text"
						placeholder="Bottom of the Page"
						onChange={(e) => setBottom(e.currentTarget.value)}
					/>
					<div className='btn'>
					<button
						onClick={(e) => {
							handleClick(e);
						}}
					>
						Random
					</button>
					{/* <button
						onClick={downloadMeme}
					>
						Download
					</button> */}
          <input type='file' name='image' onChange={uploadMeme}>
          </input>
					</div>
				</form>
				<div className="meme">
					{<img id='img' src={randomMeme} alt="" />}
					<h2 className="top">{top.toUpperCase()}</h2>
					<h2 className="bottom">{bottom.toUpperCase()}</h2>
				</div>
			</div>
		</div>
	);
}
