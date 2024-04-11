// This page is for onboarding new users 
import { useState, useEffect } from 'react'                         // ADDED THIS SHIT
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'

const Onboarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [genres, setGenres] = useState([])                        // ADDED THiS 
    // const [instruments, setInstruments] = useState([])              // ADDED ThiS 
    const [formData, setFormData] = useState({
        user_id: cookies.UserId,
        first_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        show_gender: false,
        gender_identity: '',
        gender_interest: '',
        url: '',
        about: '', 
        matches: [],
        genres: []      // COMMENTED OUT
        // instruments: []      // COMMENTED OUT
    })


    
    useEffect(() => {                                               // ADDED THIS SHIT TOO
        // Fetch genres and instruments from server
        axios.get('http://localhost:8000/genres').then(res => setGenres(res.data))
        // axios.get('/instruments').then(res => setInstruments(res.data))
    }, [])


    let navigate = useNavigate()



    // This FN handles form submissions from the Onboarding page & updates user's info in the DB
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            const success = response.status === 200
            if (success) navigate ('/dashboard')
        } catch (err) {
            console.log(err)
        }
        
    }    

    // This FN handles form changes
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    
        if (name === 'genres') {
            const genreId = e.target.value
            const genre = genres.find(g => g.genre_id === genreId)
    
            if (value) {
                // Checkbox is checked, add the genre to the genres array
                setFormData(prevState => ({
                    ...prevState,
                    genres: [...prevState.genres, genre]
                }))
            } else {
                // Checkbox is unchecked, remove the genre from the genres array
                setFormData(prevState => ({
                    ...prevState,
                    genres: prevState.genres.filter(g => g.genre_id !== genreId)
                }))
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }


    // This is the form that users will fill out to create an account
    return (
        <>
            <Nav
                minimal={true}
                setShowModal={() => { 
                }} 
                showModal={false} 
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>

                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />

                        <label>Birthday</label>
                        <div className="multiple-input-container">
                        <input
                                id="dob_month"
                                type="number"
                                name="dob_month"
                                placeholder="MM"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>

                        <label>Gender</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'man'}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                            
                            <input
                                id="woman-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'woman'}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>

                            <input
                                id="more-gender-identity"
                                type="radio"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={formData.gender_identity === 'more'}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                        </div>

                        <label htmlFor="show-gender">Show Gender on my Profile</label>
                        <input
                            id="show-gender"
                            type="checkbox"
                            name="show_gender"
                            onChange={handleChange}
                            checked={formData.show_gender}
                        />

                        <label>Show Me</label>
                        <div className="multiple-input-container">
                            <input
                                id="man-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'man'}
                            />
                            <label htmlFor="man-gender-interest">Man</label>
                            
                            <input
                                id="woman-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'woman'}
                            />
                            <label htmlFor="woman-gender-interest">Woman</label>

                            <input
                                id="everyone-gender-interest"
                                type="radio"
                                name="gender_interest"
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.gender_interest === 'everyone'}
                            />
                            <label htmlFor="everyone-gender-interest">Everyone</label>
                        </div>

                        <label htmlFor="about">About Me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I love long jam sesh's!"
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <input type="submit"/>
                    </section>

                    <section>
                        <label htmlFor="about">Profile Photo</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>

                        {/* ADDED THIS AUTOFILLED SHIT BELOW TOO - DIFFERENT FROM SUGGESTIONS */}
                        <label>Favorite Genres</label>      
                        <div className="multiple-input-container">
                            {genres.map((genre) => (
                                <div key={genre.genre_id}>
                                    <input
                                        type="checkbox"
                                        name="genres"
                                        value={genre.genre_id}
                                        onChange={handleChange}
                                    />
                                    <label>{genre.genre_name}</label>
                                </div>
                            ))}
                        </div>
                        
                    </section>

                </form>
            </div>
        </>

    )
}
export default Onboarding

