import EpisodeView from "../views/episodeView.jsx";
import {
  getEpisodesByIDSeason
} from "../../backend/model/imdb";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectedSeasonState, selectedTitle } from "../../backend/model/atoms.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Spinner from "../views/spinnerView.js";
import { loggedInUserAtom } from "../../backend/model/user.js";

function episodeViewPresenter(props: any) {
  const tempmodel = {
    imDbId: "tt0118480",
    title: "Stargate SG-1",
    fullTitle: "Stargate SG-1 (TV Series 1997–2007)",
    type: "TVSeries",
    year: "1997",
    episodes: [
      {
        id: "tt0234794",
        seasonNumber: "1",
        episodeNumber: "1",
        title: "Children of the Gods",
        image:
          "https://m.media-amazon.com/images/M/MV5BZWQ4ZWRiNTctNTcyOC00ZjA4LThiZmYtMzMxMjQxYzEwODAzXkEyXkFqcGdeQXVyMTAwMDk1MjM@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "27 Jul. 1997",
        plot: "Colonel Jack O'Neill is brought out of retirement to lead a new expedition back to Abydos, only to find an old friend, a new enemy and a far wider use of the Stargate.",
        imDbRating: "8.1",
        imDbRatingCount: "3396",
      },
      {
        id: "tt0709185",
        seasonNumber: "1",
        episodeNumber: "2",
        title: "The Enemy Within",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTgzMjEzNTk5Ml5BMl5BanBnXkFtZTgwNDE5MzIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "1 Aug. 1997",
        plot: "The team, now designated SG-1 are planning their next foray through the gate as they try to map out the variety of sites available to them and locate their missing friends. O'Neill asks that Teal'c be allowed to join his team but Gen. Hammond thinks that will be unlikely given that he is the host for a Goa'uld. Unknown to anyone, however, is that O'Neill's close friend, Maj. Charles Kawalsky, leader of SG-2, has been infected by a Goa'uld, an immature version that has not yet taken complete control of the host. Kawalsky is having regular blackouts during which the ...",
        imDbRating: "7.6",
        imDbRatingCount: "1631",
      },
      {
        id: "tt0709075",
        seasonNumber: "1",
        episodeNumber: "3",
        title: "Emancipation",
        image:
          "https://m.media-amazon.com/images/M/MV5BOTc4NDZiOTAtMTI4OS00ODgwLWFlZDktZGMyZDJlNGMyZjA1XkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "8 Aug. 1997",
        plot: "While exploring a world populated by Mongol descendants, Capt. Carter is abducted as a wife of a local warlord.",
        imDbRating: "6.0",
        imDbRatingCount: "1714",
      },
      {
        id: "tt0709181",
        seasonNumber: "1",
        episodeNumber: "4",
        title: "The Broca Divide",
        image:
          "https://m.media-amazon.com/images/M/MV5BYzUxOTgyODItNTdlMi00Njg4LWJmMDEtY2E5ZDYyYjRiMzAxXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "15 Aug. 1997",
        plot: "The Stargate base is put in deadly peril when it is contaminated with a dangerous infection which causes its victims to become mindlessly animalistic brutes.",
        imDbRating: "7.1",
        imDbRatingCount: "1488",
      },
      {
        id: "tt0709188",
        seasonNumber: "1",
        episodeNumber: "5",
        title: "The First Commandment",
        image:
          "https://m.media-amazon.com/images/M/MV5BYzYzZGYyNzgtZTc1ZC00MzQ2LTg1MWMtYTRjOGJiZjVkZDhiXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "22 Aug. 1997",
        plot: "The SG-1 team is sent after the SG-9 team that has failed to return. They find that SG-9's captain, having been treated like a god by planetary inhabitants, is drunk with power and is tyrannizing them. Can they overcome him?",
        imDbRating: "6.6",
        imDbRatingCount: "1435",
      },
      {
        id: "tt0709059",
        seasonNumber: "1",
        episodeNumber: "6",
        title: "Cold Lazarus",
        image:
          "https://m.media-amazon.com/images/M/MV5BZGNiM2FkYTYtNDZmMC00ZmQxLTkxODUtODkxNzgxZmM4NjdjXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "29 Aug. 1997",
        plot: "When Jack is injured unintentionally by a crystal alien, the alien duplicates Jack's form and out of fear of retribution tries to heal Jack. He returns to Earth in place of Jack, while Jack is still unconscious on the planet, to find the one thing he feels will accomplish this; the one thing that cannot be found again. Meanwhile, the 'real' Jack has returned and is trying to convince SGC that he is who he says he is.",
        imDbRating: "7.5",
        imDbRatingCount: "1475",
      },
      {
        id: "tt0709194",
        seasonNumber: "1",
        episodeNumber: "7",
        title: "The Nox",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTc0NDg3NTMxN15BMl5BanBnXkFtZTgwOTk4MzIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "12 Sep. 1997",
        plot: "With the Stargate program in danger of being terminated, the team is under pressure to find technology. Visiting a planet where they believe there is a creature that possesses the secret of invisibility, they encounter Apophis and his guards. Both sides receiving mortal wounds, they are aided by the planet's inhabitants, the Nox, a gentle people with a very large secret.",
        imDbRating: "8.1",
        imDbRatingCount: "1583",
      },
      {
        id: "tt0709052",
        seasonNumber: "1",
        episodeNumber: "8",
        title: "Brief Candle",
        image:
          "https://m.media-amazon.com/images/M/MV5BNWVkMTI1ODgtZWE2My00ZGViLTk0MmYtNTQ1YTAxZWUxZGUyXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "19 Sep. 1997",
        plot: "On the planet Argos, Kynthia seduces Colonel O'Neill, which gives him an Argosian lifespan of only a 100 days. As he begins to age rapidly, will the SG-1 team succeed in finding a cure?",
        imDbRating: "7.3",
        imDbRatingCount: "1407",
      },
      {
        id: "tt0709209",
        seasonNumber: "1",
        episodeNumber: "9",
        title: "Thor's Hammer",
        image:
          "https://m.media-amazon.com/images/M/MV5BZDBiMDMyNGYtMmZjZS00NWNjLWJiNDAtZjQ4ZDk5ZmRhZjkxXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "26 Sep. 1997",
        plot: "SG-1 goes to the planet Cimmeria in search of allies against the Goa'uld. Upon arrival, Jack and Teal'c are trapped in a labyrinth, where the only exit is through Thor's Hammer, a device to destroy Goa'uld, but preserve the host. Daniel Jackson must destroy the device that could someday have saved his wife in order to free his friends.",
        imDbRating: "8.0",
        imDbRatingCount: "1484",
      },
      {
        id: "tt0709205",
        seasonNumber: "1",
        episodeNumber: "10",
        title: "The Torment of Tantalus",
        image:
          "https://m.media-amazon.com/images/M/MV5BNWYyOWRmMmEtNjFlMC00NTk4LWJkNGItMTE2YjZkZmFhZmYzXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "3 Oct. 1997",
        plot: "Daniel Jackson discovers that the Stargate was activated in 1945 and a young professor went through, never to return. Together with his still living fiancée, the SG1 team discover the now aged professor, naked and trapped in a decaying fortress, containing the secrets of an Ancient alliance. Will they be able to rescue him and escape to earth in time?",
        imDbRating: "8.2",
        imDbRatingCount: "1485",
      },
      {
        id: "tt0709051",
        seasonNumber: "1",
        episodeNumber: "11",
        title: "Bloodlines",
        image:
          "https://m.media-amazon.com/images/M/MV5BMGNjYmViMmQtN2Y5NS00ZmE3LWIxODQtZTU0NjllZjRmMzkwXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "10 Oct. 1997",
        plot: "It is time for Teal'c's son Rya'c to have his primtal. Can Teal'c stop his son from being implanted with a goa'uld and becoming a slave to Apophis?",
        imDbRating: "7.3",
        imDbRatingCount: "1300",
      },
      {
        id: "tt0709091",
        seasonNumber: "1",
        episodeNumber: "12",
        title: "Fire and Water",
        image:
          "https://m.media-amazon.com/images/M/MV5BNjJiODg5NjgtNmNkOC00N2QxLThmMjktMTc2NGRkOGQ4ODA1XkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "17 Oct. 1997",
        plot: "O'Neill, Carter and Teal'c return through the Stargate shell-shocked and distressed to announce that Daniel Jackson was killed. But Jackson was captured by the last survivor of an aquatic race, who planted false memories in the other members of SG1. Can the team remember and return to rescue Daniel?",
        imDbRating: "7.1",
        imDbRatingCount: "1296",
      },
      {
        id: "tt0709101",
        seasonNumber: "1",
        episodeNumber: "13",
        title: "Hathor",
        image:
          "https://m.media-amazon.com/images/M/MV5BNDIwMTEzNTIwN15BMl5BanBnXkFtZTgwOTMwNDIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "24 Oct. 1997",
        plot: "The Goa'uld Hathor (one of the mothers of all Goa'uld), brainwashes the men of the SGC with pheromones, and nearly makes Jack a host to a larva conceived with Daniel. She flees after the unaffected women of Stargate Command retake the facility.",
        imDbRating: "7.3",
        imDbRatingCount: "1343",
      },
      {
        id: "tt0709172",
        seasonNumber: "1",
        episodeNumber: "14",
        title: "Singularity",
        image:
          "https://m.media-amazon.com/images/M/MV5BZjk3NWQ3NDMtMTFmYS00YjBlLWExZWUtNTZkMjRkZGNiYWRlXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1997",
        released: "31 Oct. 1997",
        plot: "On an astronomical black hole observation mission SG-1 finds a fatal bacterial mass-epidemic on a planet where the natives told then incredulous Daniel months ago the coming solar eclipse would bring disaster. They also take home to the Cheyenne mountain base a surviving, fairly healthy orphaned young girl, who is named Cassandra and awakes Sam's maternal instinct. The naquadah traces found in her blood turn out to have made her immune, but after she has a seizure are diagnosed to constitute a huge bomb, somehow triggered by rescuing her, the whole thing must be ...",
        imDbRating: "7.5",
        imDbRatingCount: "1291",
      },
      {
        id: "tt0709061",
        seasonNumber: "1",
        episodeNumber: "15",
        title: "Cor-ai",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjAxNzcyOTkyOF5BMl5BanBnXkFtZTgwMjQ4MzIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "23 Jan. 1998",
        plot: "SG1 travel to a planet where Teal'c is recognised as once having been head Jaffa to Apophis. He is arrested for the murder of a villager and put on trial for his life. Then other Jaffa attack the village. Will SG1 be able to save Teal'c and prove that he has changed allegiance?",
        imDbRating: "7.2",
        imDbRatingCount: "1256",
      },
      {
        id: "tt0709079",
        seasonNumber: "1",
        episodeNumber: "16",
        title: "Enigma",
        image:
          "https://m.media-amazon.com/images/M/MV5BMzM4MDdmNGEtMjhmOC00OWQxLTgyMGItYTNkZWIxOTQ1ODRiXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "30 Jan. 1998",
        plot: "On their first visit to a new planet, SG-1 finds it subject to totally destructive volcanic activity and saves ten natives, the Tollan, a far more technologically advanced society. Their leader Omoc isn't grateful, nor interested in such a primitive race as the earthlings or any of the 'even more primitive' planets which are prepared to host them. Only one Tollan, Narim, shows an active interest in life on earth, especially in captain Samantha Carter and the cat Schrodinger she gives him, explaining his planet was destroyed after the Tolan supplied an unlimited energy...",
        imDbRating: "8.0",
        imDbRatingCount: "1384",
      },
      {
        id: "tt0709175",
        seasonNumber: "1",
        episodeNumber: "17",
        title: "Solitudes",
        image:
          "https://m.media-amazon.com/images/M/MV5BM2JlZDRhNDctOGUxMC00MzJjLTlkZTktZmY0OWIwMDJkYzY5XkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "6 Feb. 1998",
        plot: "Following a Stargate technical defect, O'Neill and Carter are stranded next to a Stargate in a cave on an icy wasteland. O'Neill is severely wounded and both are freezing. Will the SGC find and rescue them in time?",
        imDbRating: "8.1",
        imDbRatingCount: "1343",
      },
      {
        id: "tt0709212",
        seasonNumber: "1",
        episodeNumber: "18",
        title: "Tin Man",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQ5NDY1MDk4MF5BMl5BanBnXkFtZTgwMjcwNDIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "13 Feb. 1998",
        plot: "After arriving on P3X-989, the team are rendered unconscious. When they wake, they return to Earth, but soon find out that they are androids. The team must return to the planet to find out what happened to their real bodies.",
        imDbRating: "7.5",
        imDbRatingCount: "1288",
      },
      {
        id: "tt0709207",
        seasonNumber: "1",
        episodeNumber: "19",
        title: "There But for the Grace of God",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTQyMjA2MjYyOF5BMl5BanBnXkFtZTgwMzY4MzIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "20 Feb. 1998",
        plot: "While collecting artifacts on a distant planet, Daniel Jackson is knocked out after touching a mirror-like object. He awakens in the same room but is unable to locate the other members of SG-1. Assuming that they left without him, he dials up his return home but gets there to find that he is in a different reality. In this world, General Jack O'Neill and Catherine Langford are in charge of the Stargate program; Hammond is a Colonel reporting to O'Neill; and Sam Carter is a civilian scientist working on the project (and also engaged to O'Neill). More importantly, Earth...",
        imDbRating: "8.6",
        imDbRatingCount: "1444",
      },
      {
        id: "tt0709142",
        seasonNumber: "1",
        episodeNumber: "20",
        title: "Politics",
        image:
          "https://m.media-amazon.com/images/M/MV5BMjMyMjY5NjY3M15BMl5BanBnXkFtZTgwMzc5MzIyMjE@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "27 Feb. 1998",
        plot: "The Stargate team must justify the project's continuation when a doubtful senator, Head of the Congressional Military Appropriations Committee, comes to review the project's performance.",
        imDbRating: "6.0",
        imDbRatingCount: "1312",
      },
      {
        id: "tt0709219",
        seasonNumber: "1",
        episodeNumber: "21",
        title: "Within the Serpent's Grasp",
        image:
          "https://m.media-amazon.com/images/M/MV5BYmY4MWQ1M2EtMzk2MS00ZTI3LWFmZmUtNzI1MzFhYTM0ZTQzXkEyXkFqcGdeQXVyMzE0OTYyNTU@._V1_Ratio1.7778_AL_.jpg",
        year: "1998",
        released: "6 Mar. 1998",
        plot: "General Hammond has tried everything to get the Senate's decision to shut down his Stargate program undone, but the President personally refuses to 'commit political suicide': the Stargate will be buried. Daniel's insistence the danger for Earth as a whole outweighs everything convinces his colleagues to ignore Hammond's command and dial the address tthat he Goa'uld invasion started from in the alternate reality that he visited. They arrive not on a planet but a new, superior type of starship, already launched by hyper-drive. A 'video' proves it belongs to Apophis, ...",
        imDbRating: "8.5",
        imDbRatingCount: "1319",
      },
    ],
    errorMessage: "",
  };
  const user = useRecoilValue(loggedInUserAtom);
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null);
  const [episodes, setEpisodes] = useState(null);
  const values = useRecoilValue(selectedTitle);
  const id = values ? values.id : "";
  const season = useRecoilValue(selectedSeasonState);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user){
      navigate("/")
     }
    const fetchData = async () => {
      const response = await getEpisodesByIDSeason(id, season);
      console.log(response);
      setTitle(response.title);
      setYear(response.year);
      setEpisodes(response.episodes);
    };
    if (season && id){
      fetchData();
    }
  }, [season, id]);


  return ((!(Object.keys(values).length === 0) && episodes) ? 
    <div>
      <EpisodeView
        title={title ? title : values ? values.name : tempmodel.title}
        year={year ? year : values ? values.year : tempmodel.year}
        episodes={episodes ? episodes : null}
      ></EpisodeView>
    </div>
    :
    <Spinner/>
  );
}

export default episodeViewPresenter;
