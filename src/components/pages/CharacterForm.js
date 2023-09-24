import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelServices';
import AppBanner from "../appBanner/AppBanner";
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import './characterForm.scss'
import thor from '../../resources/img/thor.jpeg'



const CharacterForm = () => {

	const {charId} = useParams();
	const [character, setCharacter] = useState(null)
	const {loading, error, getCharacter, clearError} = useMarvelService();

	
	useEffect(() => {
        updateChar()
    },[charId])



    const updateChar = () => {
		clearError()
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (character) => {
        setCharacter(character)
    }

	const errorMessage = error ? <ErrorMessage/> : null
	const spinner = loading ? <Spinner/> : null
	const content = !(loading || error || !character) ? <View character={character}/> : null
	
    return (
		<>
			 {errorMessage}
			 {spinner}
			 {content}
		</>
	 )
	
}

const View = ({character}) => {

	const {title, description, thumbnail} = character

	return (
			<>
			<AppBanner/>
			<div className="character">
				<img className="character__img" src={thumbnail} alt="" />
				<div className="character__info">
					<div className="character__info-title">{title}</div>
					<div className="character__info-descr">{description}</div>
				</div>
				<Link to='/' className="character__info-back">Back to all</Link>
			</div>
			</>
	)
 }

export default CharacterForm