import { Route, Routes } from 'react-router-dom'
import { CharacterList } from './CharacterList'
import { CharacterDetails } from './CharacterDetails'

export const Characters = () => {
    return (
        <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/:id" element={<CharacterDetails />} />
        </Routes>
    )
}