var UserId = String("Joepietralala");

function Hex32(n)
{
	var prefix = "";
	for (var j = 7; j > 0; j--)
		if (n >> (j * 4) == 0)
			prefix += "0";
	return prefix + n.toString(16);
}
function Key(index)
{
	if (localStorage.getItem("Z") != null)
	{
		var Z = localStorage.getItem("Z").split(";");
		var key = index < Z.length ? parseInt(Z[index]) >>> 0 : 0;
	}
	else
		var key = 0;
//	console.log("Key(" + index + ") = " + Hex32(key));
	return key;
}
function XorKu(x, k)
{
	var key = Key(k);
//	console.log("XorKu: " + Hex32(x) + " ^ " + Hex32(key) + " = " + Hex32((x ^ key) >>> 0));
	return (x ^ key) >>> 0;
}
function AskToContinue(attempt)
{
	var c = true;
	if (attempt == 2)
		c = confirm("No match yet. Continue with this key?");
	return c == true ? 0 : 1;
}
function UpdateKeyring(key, index)
{
	// This code does not update the keyring, it justs says what it should do.
	document.write("<p>Keyring update: Z[" + index + "] was " + Key(index) + "; now is " + key + "</p>");
}
function ClearUserId()
{
	document.getElementById("ID").value = '';
}
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
// Fischer-Yates shuffle.
function shuffle(o)
{
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
		;
	return o;
}
function DisplayKeysOld(shuffled)
{
	document.write("<table class=keys>");
	var decade = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
	var d = shuffled ? shuffle(decade) : decade;
	var i = 0;
	while (i < 10)
	{
		document.write("<tr>");
		var unit = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		var u = shuffled ? shuffle(unit) : unit;
		var j = 0;
		while (j < 10)
		{
			document.write("<td>");
			var v = d[i] * 10 + u[j];
			if (v == 0)
				document.write("<input type=\"button\" class=key value=\"*\" onclick=\"DisplayUserId();\">");
			else
				if (v < 10)
					document.write("<input type=\"button\" class=key value=0" + v + " onclick=\"StartLogin(" + v + ")\">");
				else
					document.write("<input type=\"button\" class=key value=" + v + " onclick=\"StartLogin(" + v + ")\">");
			j++;
			document.write("</td>");
		}
		i++;
		document.write("</tr>");
	}
	document.write("</table>");
}
function DisplayKeys(shuffled, id, func)
{
	var keypad="<table class=" + func + ">";
	var decade = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
	var d = shuffled ? shuffle(decade) : decade;
	var i = 0;
	while (i < 10)
	{
		keypad += "<tr>";
		var unit = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		var u = shuffled ? shuffle(unit) : unit;
		var j = 0;
		while (j < 10)
		{
			keypad += "<td><input type=\"button\" class=key value=";
			var v = d[i] * 10 + u[j++];
			if (v == 0)
				keypad += "\"*\" onclick=\"ClearUserId();\"></td>";
			else
			{
				if (v < 10)
					keypad += "0";
				keypad += v + " onclick=\"" + func + "(" + v + ")\"></td>";
			}
		}
		i++;
		keypad += "</tr>";
	}
	keypad += "</table>";
	document.getElementById(id).innerHTML = keypad;
}
