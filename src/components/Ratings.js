import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAPI } from "./MealsContextProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

function Ratings(props) {
  let navi = useNavigate();
  const { name, id } = props;
  const { getproductbyId, updatemealinfo } = useAPI();
  const {currentuser}=useAuth()

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");
  const stars = Array(5).fill(0);

  function saveMeal(meal) {
    updatemealinfo(meal);
  }
  function addReview() {
    const meal = getproductbyId(id);
    let rate = "";
    if (currentValue === 1) {
      rate = "pass";
    }
    if (currentValue === 2) {
      rate = "poor";
    }
    if (currentValue === 3) {
      rate = "good";
    }
    if (currentValue === 4) {
      rate = "verygood";
    }
    if (currentValue === 5) {
      rate = "excellent";
    }
    if (currentValue !== 0) {
      let lstrate = meal.rates[0][rate];
      lstrate += 1;
      meal.rates[0][rate] = lstrate;
    }
    if (comment !== "") {
      meal.comments.push({id:currentuser.id,name:currentuser.name,Comment:comment,rate:currentValue});
    }
    saveMeal(meal);
    setTimeout(() => {
      navi("/home");
    }, 1500);
  }

  return (
    <div style={styles.container}>
      <h2> {name} Ratings </h2>
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={(e) => {
                e.preventDefault();
                setCurrentValue(index + 1);
              }}
              onMouseOver={(e) => {
                e.preventDefault();
                setHoverValue(index + 1);
              }}
              onMouseLeave={(e) => {
                e.preventDefault();
                setHoverValue(undefined);
              }}
              color={
                (hoverValue || currentValue) > index
                  ? colors.orange
                  : colors.grey
              }
              style={{
                marginRight: 10,
                cursor: "pointer",
              }}
            />
          );
        })}
      </div>
      <textarea
        onChange={(e) => {
          e.preventDefault();
          setComment(e.target.value);
        }}
        placeholder="What's your experience?"
        style={styles.textarea}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          addReview();
        }}
        style={styles.button}
      >
        Submit
      </button>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 100,
    width: 300,
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
};
export default Ratings;
