import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import PropTypes from "prop-types";

import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="d-flex w-100 bd-highlight">
					<div className="w-100 bd-highlight">
						<Link to="/" className="navbar-brand active">
							<img
								src="https://static-mh.content.disney.io/starwars/assets/navigation/sw_logo_stacked-336c62367939.png"
								className="text-white w-25"
							/>
						</Link>
					</div>
					<div className="p-2">
						<ul className="navbar-nav">
							<li className="nav-item dropdown d-inline-flex">
								<div className="dropdown">
									<Dropdown>
										<Dropdown.Toggle variant="primary btn-sm" id="dropdown-basic">
											Favorites{" "}
											<span className="badge badge-light">
												{store.favorites && store.favorites.length}
											</span>
										</Dropdown.Toggle>

										<Dropdown.Menu style={{ backgroundColor: "#73a47" }}>
											{store.favorites &&
												store.favorites.map((item, index, myArray) => {
													return (
														<Dropdown.Item key={index} href="#">
															{item}
															<i
																className="fas fa-trash-alt pl-1 float-right"
																onClick={() => actions.deleteFavorites(index)}
															/>
														</Dropdown.Item>
													);
												})}
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};
