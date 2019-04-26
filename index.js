//var domain = document.location.hostname || "badssl.test";
var domain = "badssl.com";
var sanityCheckOrigin = "https://" + domain;

function createSpinner() {
  var spinner = document.createElement("span");
  spinner.classList.add("spinner");
  return spinner;
}

function calculateOrigin(config) {
  var arrOrigin = config.subdomain.split(":");
  var origin = ""
  if (arrOrigin[1]) {
    origin = "https://" + arrOrigin[1];
  }
  if (arrOrigin[2]) {
    origin += ":" + arrOrigin[2];
  }
  return origin;
}

var verdict = {
  yes:   "✅ YES", // ✅✔
  maybe: "🆗 OKAY", // 🆗🤔
  no:    "❌ NO", // ❌✖
}

function request(origin, success, failure) {
  // Not all browsers support `fetch` yet, and we might want to support older
  // browsers anyhow. 
  if (self.fetch) {
    var url = origin;    

      fetch(url, {mode: "no-cors"})
      .then(res => {
        if(res.ok) {
          return res;
        } else {
          console.log(`Request rejected with status ${res.status}:-S,`, url);
        }
      })
      .then(success, failure)
//      .catch(err => console.error('Caught error: ', err))
//      .catch(function(err) {
//        console.log('Fetch Error :-S', err);
//      });

  }
}

function test(origin, set, tr) {
  if (origin) {
    request(
      origin,
      function() {
        tr.classList.add("expected-" + set.success);
        tr.querySelector(".result").textContent = "connected";
        tr.querySelector(".expected").textContent = verdict[set.success];
      },
      function() {
        tr.classList.add("expected-" + set.fail);
        tr.querySelector(".result").textContent = "cannot connect";
        tr.querySelector(".expected").textContent = verdict[set.fail];
      }
    );
  } else {
    tr.classList.add("expected-" + set.fail);
    tr.querySelector(".result").textContent = "No Test Website";
    tr.querySelector(".expected").textContent = verdict[set.maybe];
  }
}

function createChild(parent, tag) {
  var elem = document.createElement(tag);
  parent.appendChild(elem);
  return elem;
}

function scanSet(set, container) {
  createChild(container, "h2").textContent = set.heading;

  var table = createChild(container, "table");
  
  var thead = createChild(table, "thead");
  createChild(thead, "td").textContent = "Root Certificate";
  createChild(thead, "td").textContent = "Result";
  createChild(thead, "td").textContent = "Expected";

  var tbody = createChild(table, "tbody");

  for (var i = 0; i < set.subdomains.length; i++) {
    var config = set.subdomains[i];

    var origin = calculateOrigin(config);
    var arrOrigin = config.subdomain.split(":"); 
    var tr = createChild(tbody, "tr");

    var tdSubdomain = createChild(tr, "td");
    var a = createChild(tdSubdomain, "a");
    a.href = origin;
    a.textContent = arrOrigin[0];
    a.target = "_blank";

    var tdResult = createChild(tr, "td");
    tdResult.classList.add("result");
    tdResult.appendChild(createSpinner());

    var tdExpected = createChild(tr, "td");
    tdExpected.classList.add("expected");
    tdExpected.appendChild(createSpinner());

    test(origin, set, tr)
  }
}

function error(e) {
  document.querySelector("#message").textContent = "ERROR: " + e;
  console.error(e);
}

function scan() {
  var tableWrapper = document.querySelector("#table-wrapper");
  request(sanityCheckOrigin + "/test/dashboard/small-image.png", function() {
    try {
      for (var i = 0; i < sets.length; i++) {
        scanSet(sets[i], tableWrapper);
      }
      document.body.removeChild(document.querySelector("#message"));
      tableWrapper.classList.remove("hidden");
    } catch(e) {
      error(e);
    }
  }, function() {
    error("Could not connect to test server.");
  });
}

window.addEventListener("load", scan);
