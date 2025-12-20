import { motion } from 'motion/react'
import { useDropzone } from 'react-dropzone'
import { usePendingUploads, useUploads } from '../store/uploads'
import { CircularProgressBar } from './ui/circular-progress-bar'

export function UploadWidgetUploadDropzone() {
	const addUploads = useUploads((store) => store.addUploads)
	const amountOfUploads = useUploads((store) => store.uploads.size)
	const { isThereAnyPendingUploads, globalPercentage } = usePendingUploads()

	const { getInputProps, getRootProps, isDragActive } = useDropzone({
		multiple: true,
		accept: {
			'image/jpeg': [],
			'image/png': [],
		},
		onDrop(acceptedFiles) {
			addUploads(acceptedFiles)
		},
	})

	return (
		<motion.div
			className="px-3 flex flex-col gap-3"
			animate="open"
			initial="closed"
			variants={{
				open: { opacity: 1, filter: 'blur(0)', transition: { duration: 0.15 } },
				closed: { opacity: 0, filter: 'blur(3px)' },
			}}
		>
			<div
				data-active={isDragActive}
				className="cursor-pointer text-zinc-400 bg-black/20 p-5 rounded-lg border border-zinc-700 border-dashed h-32 flex flex-col items-center justify-center gap-1 hover:border-zinc-600 transition-colors data-[active=true]:border-lime-500 data-[active=true]:bg-lime-500/10 data-[active=true]:text-lime-400"
				{...getRootProps()}
			>
				<input type="file" {...getInputProps()} />

				{isThereAnyPendingUploads ? (
					<div className="flex flex-col gap-2.5 items-center">
						<CircularProgressBar
							progress={globalPercentage}
							size={56}
							strokeWidth={4}
						/>
						<span className="text-xs">
							Uploading {amountOfUploads} files...
						</span>
					</div>
				) : (
					<>
						<span className="text-xs">Drop your files hire or </span>
						<span className="text-xs underline">click to open picker</span>
					</>
				)}
			</div>

			<span className="text-xxs text-zinc-400">
				Only PNG and JPEG files are supported.
			</span>
		</motion.div>
	)
}
