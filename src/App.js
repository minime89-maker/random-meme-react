import { useEffect, useState } from 'react';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


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

  // download meme
  const downloadMeme = (e) => {
    e.preventDefault()
    domtoimage.toBlob(document.getElementById('meme'))
    .then(function(blob) {
      saveAs(blob, 'meme.png')
    })    
    console.log(document.getElementById('meme'))
  }

  // upload own img and create meme
  const uploadMeme = (e) => {
    let img = e.target.files[0]
    setRandomMeme(URL.createObjectURL(img))
  }

  const resetMeme = (e) => {
    e.preventDefault()
    setRandomMeme('https://i.imgflip.com/1h7in3.jpg')
    setTop('')
    setBottom('')
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
					<button
						onClick={downloadMeme}
					>
						Download
					</button>
          <button onClick={resetMeme}>Reset</button>
          <input type='file' name='image' onChange={uploadMeme}>
          </input>
					</div>
				</form>
				<div className="meme" id='meme'>
					{<img  src={randomMeme} alt="" />}
					<h2 className="top">{top}</h2>
					<h2 className="bottom">{bottom}</h2>
				</div>
			</div>
		</div>
	);
}
