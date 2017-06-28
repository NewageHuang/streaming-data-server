var ffmpeg = require('fluent-ffmpeg');
var commad = ffmpeg();

var inputPath = 'video="Integrated Camera"';
var outputPath = 'rtmp://localhost:50055/live/test';

ffmpeg()
	.input('video=Integrated Camera')
	.inputFormat('dshow')
	.inputOptions('-s 640x480')
	.on('start',function(commandLine){
		console.log('Spawned Ffpmeg with command: '+ commandLine);
	})
	.on('error',function(err,stdout,stderr){
		console.log('error: ' + err.message);
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
	})
	.on('progress',function(progress){
		console.log('Frame=' + progress.frames
			+ ' fps=' + progress.currentFps
			+ ' Kbps=' + progress.currentKbps
			+ ' size=' + progress.targetSize
			+ ' time=' + progress.timemark);
	})
	.on('end',function(){
		console.log('Processing finished!');
	})
	.addOptions([
		'-vcodec libx264',
		'-acodec copy',
		'-preset ultrafast', //-preset:v veryfast //Sacrifice video quality for fluency
		'-tune:v zerolatency',
		'-b 900k'
		//'-crf 22',
		//'-maxrate 1000k',
		//'-bufsize 3000k',
		//'-acodec libmp3lame',
		//'-ac 2', //Double channel output
		//'-ar 44100', //Audio Sample Rate
		//'-b:a 96k'
		])
	.format('flv')
	.save(outputPath);
	//.pipe(outputPath, { end: true });








		//.inputOptions('-re') //output video with the primary video frame rate
	//.inputOptions('-ac 2') //Double channel output
	// .addInput('./bin/logo.png')
 //    .complexFilter([
 //        {
 //            filter: 'scale',
 //            options: [1080,-1],
 //            inputs: '[0:v]',
 //            outputs: 'c'
 //        },
 //        {
 //            filter: 'scale',
 //            options: [200,-1],
 //            inputs: '[1:v]',
 //            outputs: 'logo'
 //        },
 //        {
 //            filter: 'overlay',
 //            options: {
 //                x: 'main_w-overlay_w-5',
 //                y: 5
 //            },
 //            inputs: ['c','logo'],
 //            outputs: ['output','a']
 //        }
	// 	],'output')