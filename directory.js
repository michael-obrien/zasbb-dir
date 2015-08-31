'use strict';

var seneca = require('seneca')()
seneca.use('jsonfile-store',{folder:'./localdb'})

seneca.listen(10101)

//discovery - for debug only
seneca.add({cmd:'config'}, function (msg, done) {
  console.log(msg.data);
  done(null, msg.data);
});

//not used currently. 'user' entities will contain publically available info.
  //regarding users; but no credentials etc. Those are stored in same 'id'
  //'credential' entities currently.
seneca.add( 'role:find,cmd:user', function FindUser( msg, respond ) {
  var user=seneca.make$('user')
  user.load$( {id:msg.id}, function(err,userDetails){
    respond( null, { user: userDetails })
  })
})

//return a specific post
seneca.add( 'role:find,cmd:post', function FindPost( msg, respond ) {
  var post=seneca.make$('post')
  post.load$( {id:msg.id}, function(err,postDetails){
    respond( null, { post: postDetails })
  })
})

//return a specific thread (which contains the list of all posts therein as well
  //as Authors, timestamps etc.)
seneca.add( 'role:find,cmd:thread', function FindThread( msg, respond ) {
  var thread=seneca.make$('thread')
  thread.load$( {id:msg.id}, function(err,threadDetails){
    respond( null, { thread: threadDetails })
  })
})

//return the details of a specific forum section, user level required etc. as
  //well as a flag to show whether this forum section can contain threads.
  //some sections won't be able to contain posts such as divides and section
  //headings for example.
seneca.add( 'role:find,cmd:section', function FindSection( msg, respond ) {
  var section=seneca.make$('section')
  section.load$( {id:msg.id}, function(err,sectionDetails){
    respond( null, { section: sectionDetails })
  })
})

//returns a layout entity (which simply contains the order in which sections
  //shoudl be displayed)
seneca.add( 'role:find,cmd:layout', function FindLayout( msg, respond ) {
  var layout=seneca.make$('layout')
  layout.load$( {id:msg.id}, function(err,layoutDetails){
    respond( null, { layout: layoutDetails })
  })
})

//returns a list of all forum sections
seneca.add( 'role:list,cmd:layout', function ListLayout( msg, respond ) {
  var sec_item=seneca.make$('section')
  sec_item.list$( function(err,list) {
    respond( null, { listing: list })
  })
})

//returns a list of all threads whose parentid matches msg.id
seneca.add( 'role:list,cmd:threads', function ListThreads( msg, respond ) {
  var thread_item=seneca.make$('thread')
  thread_item.list$( {parentid:msg.id}, function(err,list) {
    respond( null, { listing: list })
  })
})

//returns a list of all user credentials. This feature should be removed and
  //handled by the Hapi server at init time instead.
seneca.add( 'role:list,cmd:credentials', function ListUsers( msg, respond ) {
  var user_item=seneca.make$('credentials')
  user_item.list$( function(err,list) {
    respond( null, { listing: list })
  })
})
