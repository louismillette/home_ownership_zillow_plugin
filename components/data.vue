<template>
	<ul class="collapsible popout data-table">
		<li>
			<div class="collapsible-header">Cash Flow Chart</div>
			<div id="cash_flow" class="datapoint-container collapsible-body">
				<div class="calc-container">
					<div id="mainchart" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
				</div>
			</div>
		</li>
		<li>
			<div class="collapsible-header">First Month</div>
			<div id="first_month" class="datapoint-container collapsible-body"></div>
		</li>
		<li>
			<div class="collapsible-header">Nominal Profit</div>
			<div id="nominal_profit" class="datapoint-container collapsible-body"></div>
		</li>
		<li>
			<div class="collapsible-header">Real Dollar Profit</div>
			<div id="real_profit" class="datapoint-container collapsible-body"></div>
			</div>
		</li>
		<li>
			<div class="collapsible-header">Payback Period</div>
			<div id="number_of_months_to_pay_back_initial" class="datapoint-container collapsible-body"></div>
		</li>
		<li>
			<div class="collapsible-header">EAC</div>
			<div id="eac" class="datapoint-container collapsible-body"></div>
		</li>
		<li>
			<div class="collapsible-header">Value of Real Reinvested Profits</div>
			<div id="real_reinvested_profits" class="datapoint-container collapsible-body"></div>
		</li>
		<li>
			<div class="collapsible-header">Rent vs Buy</div>
			<div id="renters_profit_over_owner" class="datapoint-container collapsible-body"></div>
		</li>
	</ul>
</template>

<style type="text/css">
	.data-table {
		width:90%;
		margin:auto;
	}
	.datapoint-container {
		display: none;
		padding:10px;
		text-align: center;
	}
	.datapoint-container > p {
		margin:2px;
	}
	.row{
		margin-bottom: 10px;
	}
</style>

<script>
export default {}
</script>