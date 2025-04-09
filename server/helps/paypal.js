const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: "Acm39EAD14ZL2DMDuIa4T8-cA9-3B_4CUz2Bc-Uq2hdle7_FDkyBAs7CL0DTUpRe6VH_MSIr_PopWJZD",
    client_secret:"EEdLPE077C3YIxhZtk8tmTUp8N_Fjw6kp9STkqwv55r4FHlo_wwpG7u9u0a2pryKIeWD-Dh2gVmRPiQH"
})

module.exports = paypal