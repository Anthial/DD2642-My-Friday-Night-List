import TriviaView from "../views/triviaView.jsx";
import { getTriviaByID } from "../../backend/model/imdb";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { selectedTitleAtom } from "../../backend/model/atoms.js";

function triviaViewPresenter(props: any) {
  const id = "tt1630029";
  const query = "cats";
  const [items, setItems] = useState(null);
  const title = useRecoilValue(selectedTitleAtom);
  useEffect(() => {
    const fetchData = async () => {
      const resp = await getTriviaByID(id);
      console.log(resp.items);
      setItems(resp.items);
    };
    if (id){
        fetchData();
    }
  }, []);

  const tempItems = [
    {
      question:
        "Why did the makers of the series replace Kurt Russell and James Spader with other actors for the same Jack O'Neill and Daniel Jackson?",
      answer:
        "Because Richard Dean Anderson and Michael Shanks are far more believable as O'Neill and Jackson than whoever those two were in the movie. They should have been in the movie as well.",
    },
    {
      question: "Why did Richard Dean Anderson/Jack O'Neill leave the show?",
      answer:
        'Anderson left the show after Season 8 wrapped to spend more time with his daughter, and O\'Neill left the SGC after he was promoted the rank of Major General, and (presumably) to head "Homeworld Security" department.It should also be noted he is a long time co-producer of all 3 "Stargate" TV series ("SG1", "Atlantis", & "Universe"). As such, his steady income was set.',
    },
    {
      question: "Why does every Alien race speak Modern English??",
      answer:
        'In the original Stargate movie, the inhabitants of Abydos, the planet the initial Stargate team travels to, speak a version of ancient Egyptian which Daniel Jackson was able to translate. In a two hour movie with a three act structure, this makes the story more interesting and time can be dealt relating to the conflicts with it. In a 40-45 minute weekly show however, not enough time exists within each episode for Daniel Jackson or someone else to translate every language of every single planet that SG-1 visits (though one can reasonably argue that most planets in the Milky Way have sizable Goa\'uld-speaking populations). Thus, for the sake of storytelling, the writers decided it would be best to ignore this issue completely. For the sake of the entertainment, it is best for the viewers to ignore this issue as well and enjoy the stories that exist, even if it can be a mental challenge, especially in the episodes that feature fellow Earthlings, the Russians, speaking a different language or, at best, showing a heavy accent.It is unfortunate that the writers didn\'t utilize any of the standard solutions to the language problem, such as portable universal translators (used successfully in all Star Trek series) or devices that imprint linguistic knowledge directly into the brain (those aren\'t the only solutions, of course). Teal\'c could\'ve easily supplied SG-1 with such technology right in the first episode. This could even have explained perfectly why Teal\'c, Vala, and some others speak English on such a formal level (don\'t understand slang in particular), Teal\'c not being aware of his frequent usage of the word "indeed", and so on. All this is fitting for a programmed knowledge. Interestingly, the devices that imprint immense amount of information (including language) directly into the brain within moments have appeared later in the series as the Ancient Repositories of Knowledge.But the writers didn\'t even try to "back-sell" this explanation later in the show (which wouldn\'t be too difficult). Perhaps one day they will. After all, the sudden appearance of Klingon head ridges in "Star Trek - The Motion Picture" was eventually explained, even if it took 30 years. But so far, the only explanation provided or implied in all Stargate installations is that all of the planets where they speak English were colonized with English-speaking people from Earth. Although this might partially work with the worlds colonized by Merlin with people from medieval England, even their English would be very different after a thousand years of independent development. And of course this wouldn\'t work at all with worlds colonized by Goa\'uld in the Milky Way or the Ancients in the Pegasus galaxy, since this would have happened at least 7000 years ago when Ra left the Earth and the stargate was buried (Atlantis was abandoned even earlier), long before any precursor to the modern English emerged anywhere in the world, let alone in ancient Egypt. But those aliens don\'t just speak English, they almost invariably speak American-English, and with American or Canadian accents to boot!Joseph Mallozzi, one of the writers of the series, has tried to explain it on his blog by saying that in his mind everyone who travels through the Stargate gets implanted with translator nanites that work both ways - it allows the traveler to be understood by people who have not gone through the Stargate and vice-versa. According to him, some languages like the Goa\'uld were resistant to these translator nanites. It is unknown if the other writers and staff of the series agree with this explanation.It should be noted that the writers admit this oddity in the "Wormhole X-treme!" episode, when one of the characters makes fun of the fact that all aliens in the "Wormhole X-treme!" show speak English. It should also be noted that there are a few episodes where there is a language difference and communication does not come easily, such as when Daniel encounters the Unas.The produces first realized this may be an issue when starting the show, so they discussed the fact that the first time an individual uses the Stargate the "Gate" would automatically Internally inplant a microscopic universal translator to somewhere in the brain so thus any travelers would be able to communicate with other Alien Individuals, however it can translate most but not all languages and dialects, but this was decided that a "true" fan would not pay attention to this minor detail and even went as far to make a joke about it in the episode "Wormhole X-treme".',
    },
    {
      question: "Why did Michael Shanks leave the show",
      answer:
        'Ive been playing the same character for a long time, says Shanks. I felt that the character was a regular and should be utilized like that. I thought that would be appropriate, but I felt that wasnt going to be the case. I was going to become a useless actor on that show. I felt that I should move on and do something else as an actor, so I decided to leave. But, adds Shanks carefully, our disagreement about the course of the show is not related to the wonderful years I have worked with these people. These people are great.After doing 2 guest appearances during season 6 "Abyss" and "The Changeling", he realised that he really liked working there and missed it, and was brought back in the last episode of season 6 "Full Circle"It should be noted it was reported there were financial issues (which were ultimately resolved). Whether true or not, only the parties involved can verify this.',
    },
  ];

  return (
    <div>
      <TriviaView
        items={items}
        title={title ? title.name : "Loading..."}
        year={title ? title.year.toString() : "Loading..."}
        image={title ? title.imageUrl : "spinner.svg"}
      ></TriviaView>
    </div>
  );
}

export default triviaViewPresenter;
