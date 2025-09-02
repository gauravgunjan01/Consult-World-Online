import React from 'react';
import Modal from 'react-modal';
import BirthDetail from './kundli/BirthDetail';
import AstroDetail from './kundli/AstroDetail';
import FriendshipTable from './kundli/FriendshipTable';
import KPBirthDetail from './kundli/KPBirthDetail';
import KPPlanetaryPosition from './kundli/KPPlanetaryPosition';
import KPCuspsDetail from './kundli/KPCuspsDetail';
import KPPlanetSignificator from './kundli/KPPlanetSignificator';
import KPHouseSignificator from './kundli/KPHouseSignificator';
import KPRulingPlanets from './kundli/KPRulingPlanets';
import PlanetaryPosition from './kundli/PlanetaryPosition';
import Upgraha from './kundli/Upgraha';
import DashamBhavMadhya from './kundli/DashamBhavMadhya';
import AshtakVarga from './kundli/AshtakVarga';
import Sarvashtak from './kundli/Sarvashtak';
import VimshottariDasha from './kundli/VimshottariDasha';
import YoginiDasha from './kundli/YoginiDasha';
import JaiminiDetails from './kundli/JaiminiDetails';
import CharDasha from './kundli/CharDasha';
import NumerologyDetails from './kundli/NumerologyDetails';
import MangalDosha from './kundli/MangalDosha';
import KaalsarpDosha from './kundli/KaalsarpDosha';
import PitriDosha from './kundli/PitriDosha';
import SadheSati from './kundli/SadheSati';
import AscendantPrediction from './kundli/AscendantPrediction';
import SignPrediction from './kundli/SignPrediction';
import PlanetConsideration from './kundli/PlanetConsideration';
import BhavPrediction from './kundli/BhavPrediction';
import NakshatraPrediction from './kundli/NakshatraPrediction';
import LagnaChart from './kundli/chart/LagnaChart';
import MoonChart from './kundli/chart/MoonChart';
import SunChart from './kundli/chart/SunChart';
import ChalitChart from './kundli/chart/ChalitChart';
import DreshkanChart from './kundli/chart/DreshkanChart';
import NavamanshaChart from './kundli/chart/NavamanshaChart';
import DashamanshaChart from './kundli/chart/DashamanshaChart';
import DwadasmanshaChart from './kundli/chart/DwadasmanshaChart';
import TrishamanshaChart from './kundli/chart/TrishamanshaChart';
import ShashtymanshaChart from './kundli/chart/ShashtymanshaChart';
import KPBirthChart from './kundli/KPBirthChart';
import KPCuspsChart from './kundli/KPCuspsChart';
import HoraChart from './kundli/chart/HoraChart';

Modal.setAppElement('#root');

const KundliModal = ({ modalData, visible, handleVisible }) => {

    return (
        <>
            <Modal isOpen={visible} className="modal-content" overlayClassName="modal-overlay" closeTimeoutMS={200}>
                <div className='flex justify-between items-center bg-primary text-white px-5 py-2'>
                    <div>{modalData?.title}</div>
                    <div onClick={() => handleVisible(false)} className='bg-red-600 text-white px-4 py-1 rounded-md cursor-pointer'>Close</div>
                </div>
                <div className='p-5 overflow-x-scroll text-nowrap'>
                    {modalData?.title == 'Birth Details' && <BirthDetail data={modalData?.data} />}
                    {modalData?.title == 'Astro Details' && <AstroDetail data={modalData?.data} />}
                    {modalData?.title == 'Friendship Table' && <FriendshipTable data={modalData?.data} />}
                    {modalData?.title == 'KP Birth Details' && <KPBirthDetail data={modalData?.data} />}
                    {modalData?.title == 'KP Planetary Positions' && <KPPlanetaryPosition data={modalData?.data} />}
                    {modalData?.title == 'KP Cusps Details' && <KPCuspsDetail data={modalData?.data} />}
                    {modalData?.title == 'KP Birth Chart' && <KPBirthChart data={modalData?.data} />}
                    {modalData?.title == 'KP Cusps Chart' && <KPCuspsChart data={modalData?.data} />}
                    {modalData?.title == 'KP Planet Significators' && <KPPlanetSignificator data={modalData?.data} />}
                    {modalData?.title == 'KP House Significators' && <KPHouseSignificator data={modalData?.data} />}
                    {modalData?.title == 'KP Ruling Planets' && <KPRulingPlanets data={modalData?.data} />}
                    {modalData?.title == 'Planetary Position' && <PlanetaryPosition data={modalData?.data} />}
                    {modalData?.title == 'Upgraha' && <Upgraha data={modalData?.data} />}
                    {modalData?.title == 'Dasham Bhav Madhya' && <DashamBhavMadhya data={modalData?.data} />}
                    {modalData?.title == 'Ashtak Varga' && <AshtakVarga data={modalData?.data} />}
                    {modalData?.title == 'Sarvashtak' && <Sarvashtak data={modalData?.data} />}
                    {modalData?.title == 'Vimshottari Dasha' && <VimshottariDasha data={modalData?.data} />}
                    {modalData?.title == 'Yogini Dasha' && <YoginiDasha data={modalData?.data} />}
                    {modalData?.title == 'Jaimini Details' && <JaiminiDetails data={modalData?.data} />}
                    {modalData?.title == 'Char Dasha' && <CharDasha data={modalData?.data} />}
                    {modalData?.title == 'Numerology Details' && <NumerologyDetails data={modalData?.data} />}
                    {modalData?.title == 'Mangal Dosha' && <MangalDosha data={modalData?.data} />}
                    {modalData?.title == 'Kaalsarp Dosha' && <KaalsarpDosha data={modalData?.data} />}
                    {modalData?.title == 'Pitri Dosha' && <PitriDosha data={modalData?.data} />}
                    {modalData?.title == 'Sadhe Sati' && <SadheSati data={modalData?.data} />}
                    {modalData?.title == 'Ascendant Prediction' && <AscendantPrediction data={modalData?.data} />}
                    {modalData?.title == 'Sign Prediction' && <SignPrediction data={modalData?.data} />}
                    {modalData?.title == 'Planet Consideration' && <PlanetConsideration data={modalData?.data} />}
                    {modalData?.title == 'Bhav Prediction' && <BhavPrediction data={modalData?.data} />}
                    {modalData?.title == 'Nakshatra Prediction' && <NakshatraPrediction data={modalData?.data} />}
                    {modalData?.title == 'Lagna Chart' && <LagnaChart data={modalData?.data} />}
                    {modalData?.title == 'Moon Chart' && <MoonChart data={modalData?.data} />}
                    {modalData?.title == 'Sun Chart' && <SunChart data={modalData?.data} />}
                    {modalData?.title == 'Chalit Chart' && <ChalitChart data={modalData?.data} />}
                    {modalData?.title == 'Hora Chart' && <HoraChart data={modalData?.data} />}
                    {modalData?.title == 'Dreshkan Chart' && <DreshkanChart data={modalData?.data} />}
                    {modalData?.title == 'Navamansha Chart' && <NavamanshaChart data={modalData?.data} />}
                    {modalData?.title == 'Dashamansha Chart' && <DashamanshaChart data={modalData?.data} />}
                    {modalData?.title == 'Dwadasmansha Chart' && <DwadasmanshaChart data={modalData?.data} />}
                    {modalData?.title == 'Trishamansha Chart' && <TrishamanshaChart data={modalData?.data} />}
                    {modalData?.title == 'Shashtymansha Chart' && <ShashtymanshaChart data={modalData?.data} />}
                </div>
            </Modal>
        </>
    )
}

export default KundliModal;