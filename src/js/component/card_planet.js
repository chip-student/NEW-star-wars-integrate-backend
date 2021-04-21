import React, { useContext } from "react";
import { BsHeart } from "react-icons/bs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Context } from "../store/appContext";

const CardPlanet = props => {
	const { store, actions } = useContext(Context);
	return (
		<div className="col-sm-3 mt-2">
			<div className="card">
				<img
					className="card/-img-top w-100"
					src="https://starwarsblog.starwars.com/wp-content/uploads/2016/09/5Tatooine-1.jpeg"
					alt="Card image planets"
				/>
				<div className="card-body">
					<div>
						<div className="d-flex justify-content-center">
							<h5 className="card-title">{props.name}</h5>
						</div>
						<div className="d-flex flex-column p-0">
							<p className="p-0">
								Population: {props.population}
								<br />
								Terrain: {props.terrain}
							</p>
						</div>
					</div>

					<div className="d-flex justify-content-between">
						<div>
							<Link to={"/planetprofile/" + props.id}>
								<button type="button" className="btn btn-outline-primary">
									Learn more!
								</button>
							</Link>
						</div>
						<div>
							<button
								type="button"
								className="btn btn-outline-warning"
								onClick={() => actions.addFavorites(props.name)}>
								<BsHeart />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CardPlanet.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
	population: PropTypes.number,
	terrain: PropTypes.string
};

export default CardPlanet;
