<template>
  <div>
    <div class="calc-container">
        <div class="row" style="width:100%;margin:auto;">
            <form id="form" onsubmit="return HandleCalculator(event);">
                <slider name="Simulation Duration (years)"
                      id="sim_duration"
                      min="5"
                      max="40"
                      defaultvalue="30">
                </slider>
                <slider name="Mortgage Duration (months)"
                      id="mortgage_length"
                      min="60"
                      max="480"
                      defaultvalue="360">
                </slider>
                <slider name="List Price"
                      id="list_price"
                      min="20000"
                      max="2000000"
                      defaultvalue="360000"
                      prefix="$">
                </slider>
                <slider name="Selling Price"
                      id="selling_price"
                      min="20000"
                      max="2000000"
                      defaultvalue="360000"
                      prefix="$">
                </slider>
                <slider name="Taxable Price"
                      id="taxable_price"
                      min="20000"
                      max="2000000"
                      defaultvalue="360000"
                      prefix="$">
                </slider>
                <slider name="Sales Tax"
                      id="sales_tax"
                      min="0"
                      max="20"
                      defaultvalue="8"
                      suffix="%">
                </slider>
                <slider name="Property Tax"
                      id="property_tax"
                      min="0"
                      max="20"
                      defaultvalue="1.5"
                      suffix="%">
                </slider>
                <slider name="Interest Rate"
                      id="interest_rate"
                      min="0"
                      max="20"
                      defaultvalue="3.8"
                      suffix="%">
                </slider>
                <radio name="Is this new?"
                      id="new"
                      v-bind:options="[{'key': '', 'text': 'No'}, {'key': '1', 'text': 'Yes'}]">
                </radio>
                <slider name="Down Payment"
                      id="down_payment"
                      min="0"
                      max="100"
                      defaultvalue="15"
                      suffix="%">
                </slider>
                <slider name="Fixed Closeing Costs"
                      id="closeing_costs"
                      min="500"
                      max="150000"
                      defaultvalue="5200"
                      prefix="$">
                </slider>
                <slider name="Monthly Rental Income"
                      id="rental_income"
                      min="0"
                      max="50000"
                      defaultvalue="2300"
                      prefix="$">
                </slider>
                <slider name="Percent Unit Occupied"
                      id="percent_time_unit_occupied"
                      min="0"
                      max="100"
                      defaultvalue="60"
                      suffix="%">
                </slider>
                <slider name="Monthly Maintainance"
                      id="maintainance_monthly"
                      min="0"
                      max="5000"
                      defaultvalue="150"
                      prefix="$">
                </slider>
                <slider name="Monthly Condo Fee"
                      id="condo_fee"
                      min="0"
                      max="2500"
                      defaultvalue="250"
                      prefix="$">
                </slider>
                <slider name="Corprate Tax Rate"
                      id="corprate_tax_rate"
                      min="0"
                      max="100"
                      defaultvalue="15"
                      suffix="%">
                </slider>
                <slider name="Individual Tax Rate"
                      id="individual_tax_rate"
                      min="0"
                      max="100"
                      defaultvalue="20"
                      suffix="%">
                </slider>
                <slider name="Monthly Insurance"
                      id="insurance"
                      min="0"
                      max="5000"
                      defaultvalue="50"
                      prefix="$">
                </slider>
                <div class="col-sm-12">
                  <div class="submit-wrap">
                    <input id="submit" type="submit" value="How Much?">
                  </div>
                </div>
            </form>
        </div>
    </div>
    <div class="loading" style="text-align: center;"></div>
  </div>
</template>

<script>
export default {}
</script>