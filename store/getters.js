export default {
	// user
	hasLogedIn: state => state.user.hasLogedIn,
	// common
	pcs: state => state.common.pcs,
	pcas: state => state.common.pcas,
	cities: state => state.common.cities,
	areas: state => state.common.areas,
	isLoadingPcs: state => state.common.isLoadingPcs,
	isLoadingPcas: state => state.common.isLoadingPcas,
	isLoadingCities: state => state.common.isLoadingCities,
}
