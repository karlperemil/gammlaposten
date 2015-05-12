var keystone = require('keystone'),
Types = keystone.Field.Types;

/**
* Copy Model
* ==========
*/

var Copy = new keystone.List('Copy', {
  nocreate: true,
  nodelete: true
});

var copyNames =
{
  menu1: 'Berättelser',
  menu2: 'Dela med dig',
  menu3: 'Bli ambassadör',
  menu4: 'Start',

  'header_home' : 'Du som arbetar i socialtjänsten behöver bättre förutsättningar.  Här har vi samlat berättelser från ett antal medarbetare som tillsammans med sina kollegor  har tagit initiativ och förändrat.',
  'header_berattelser' : 'Här har vi samlat berättelser från ett antal medarbetare inom socialtjänsten. De har, tillsammans med sina kollegor, tagit initiativ och förändrat sina arbetsplatser.',
  'header_berattelse' : 'Här har vi samlat berättelser från ett antal medarbetare inom socialtjänsten. De har, tillsammans med sina kollegor, tagit initiativ och förändrat sina arbetsplatser.',
  'header_story' : 'Du som arbetar i socialtjänsten behöver bättre förutsättningar.  Här har vi samlat berättelser från ett antal medarbetare som tillsammans med sina kollegor  har tagit initiativ och förändrat.',
  'header_ambassador' : 'Det är medarbetarna i socialtjänsten som sitter på lösningarna. Tillsammans kan vi förändra. Vill du bli ambassadör för Framtidens Socialtjänst? ',

  'home_signup_header' : 'Var med och bygg Framtidens Socialtjänst',
  'home_signup_ingress' : 'Få löpande nyheter och bygg framtidens socialtjänst tillsammans med andra medarbetare i socialtjänsten.',
  'home_signup_checkbox_label' : 'Jag är medlem i Vision',
  'home_signup_button' : 'Jag är med!',
  'home_signup_pul' : 'Genom att skriva in mina kontaktuppgifter godkänner jag att Vision använder mina uppgifter i överenstämmelse med PUL.',
  'home_insta_header' : 'Vi är framtidens socialtjänst',
  'home_insta_ingress' : 'Det här vill vi förändra för att skapa framtidens socialtjänst. Vad vill du förändra? ',

  'member_header' : 'Bli medlem idag!<br>Du får:',
  'member_p_1' : 'Inflytande på jobbet',
  'member_p_2' : 'Löne- och karriärcoaching',
  'member_p_3' : 'Facklig rådgivning',
  'member_button' : 'Bli medlem!',

  'footer_phone' : 'Vision Direkt',
  'footer_phone_2' : 'Facklig rådgivning alla vardagar mellan 8-20',
  'footer_phone_number' : '0771 44 00 00',
  'footer_p' : 'Vision är fackförbundet för dig som jobbar med socialt arbete eller studerar till socionom.',

  'help_header' : 'Har du frågor?',
  'help_ingress' : 'Kontakta Vision Direkt',
  'help_checkbox_label' : 'Jag är medlem i Vision',
  'help_button' : 'Skicka!',
  'help_pdf' : 'Ladda ner en PDF med ovanstående berättelse.',

  'story_header' : 'Vi vill höra din berättelse',
  'story_ingress' : 'Har du och dina kollegor tagit initiativ för att förändra på er arbetsplats? Berätta!',
  'story_button' : 'Skicka!',
  'story_pul' : 'Genom att skriva in mina kontaktuppgifter godkänner jag att Vision använder mina uppgifter inom ramen för denna kampanj och i överenstämmelse med PUL',

  'berattelse_puff_header' : 'Berättelser för dom som är med och skapar framtidens socialtjänst',
  'berattelse_puff_readmore' : 'Läs mer här',
  'berattelse_puff_link' : '#',

  'ambassador_thanks' : '',

  'ambassador_thanks_header' : 'Toppen',
  'ambassador_thanks_ingress' : 'Dela så att vi blir fler!',
  'ambassador_thanks_p' : 'Eller så kan du göra mer redan idag...',
  'ambassador_thanks_cta' : 'Bli ambassadör',
  'ambassador_steps_header' : 'Som ambassadör för framtidens socialtjänst kan du göra något av följande:',
  'ambassador_steps_1' : 'Mejla tre kollegor och tipsa om framtidenssocialtjanst.se',
  'ambassador_steps_2' : 'Berätta om <a href="/dela_med_dig" target="_blank">initiativ till förbättring</a> som ni har tagit på din arbetsplats.',
  'ambassador_steps_3' : 'Skriv ut och genomför <a href="link_missing" target="_blank">Jobbhjulet</a> med dina kollegor',
  'ambassador_button' : 'Jag är med!',
  'ambassador_pul' : 'Genom att skriva in mina kontaktuppgifter godkänner jag att Vision använder mina uppgifter inom ramen för denna kampanj och i överenstämmelse med PUL',

  'question_header' : 'Behöver du hjälp?',
  'question_p' : 'Här kan du ställa frågor direkt till sakkunniga hos oss på Vision',
  'question_pdf' : 'Ladda ner material som PDF! (X MB)',
  'question_pdf_2' : 'Ladda ner brickunderlägg! (X MB)',

  'illustration_text1' : '',
  'illustration_text2' : '',
  'illustration_text3' : '',

  'share_facebook_title' : 'Medarbetarna inom socialtjänsten behöver bättre förutsättningar.',
  'share_facebook_description' : 'Ta del av verktyg och berättelser från kollegor som har tagit initiativ och förändrat. Vilka idéer har du?',
  'share_twitter' : 'Jag är med och bygger framtidens socialtjänst.',
  'share_twitter_hashtag' : '#framsoc',
  'share_email_subject' : 'Jag är med och bygger framtidens socialtjänst! Var med du också!',
  'share_email_body' : 'Hej, har du sett den här satsningen från Vision? På framtidenssocialtjanst.se finns berättelser från medarbetare inom socialtjänsten som förändrat sina arbetsplatser. Vänliga hälsningar XXX http://www.framtidenssocialtjanst.se'
}

var copyObj = {}
for(key in copyNames){
  copyObj[key] = {type: Types.Textarea, required: false }
}

Copy.add(copyObj);

Copy.register();
