import fs from 'node:fs';
import path from 'node:path';

const contentDir = path.resolve('src/features/blog/content/en');

const groups = {
  'beanBot.mdx': [
    ['Project / Result Summary', ['Makerspace 2 - BeanBot']],
    ['Problem / Goal', ['My Goal']],
    ['Key Design Decisions', ['Making the chassis']],
    ['How It Works', ['Code', 'Electronics']],
    ['Testing / Results', ['Final Product / Reflection']],
  ],
  'carkit.mdx': [
    ['Project / Result Summary', ['CarKit']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['Features', 'Motor Channels Overview']],
    ['Problem / Goal', ['What is this?', 'Why?']],
    ['Constraints', ['Disclaimer']],
    ['How It Works', ['How It Works', 'Using a Bluetooth Controller', 'RGB LEDs']],
    ['Testing / Results', ['Project State']],
    ['Files / BOM', ['Project Files', 'BOM']],
  ],
  'daydream-atlanta.mdx': [
    ['Project / Result Summary', ['Daydream Atlanta: Running the show']],
    ['Strongest Photo / Video', ['Featured film — Daydream', 'Some Photos']],
    ['Problem / Goal', ['About Daydream (global)']],
    ['How It Works', ['Schedule']],
    ['Testing / Results', ['How I learned Godot: *Yeastbound: Rise of the Dough*', 'Shout-outs']],
    ['Files / BOM', ['Resources & links']],
  ],
  'ffms.mdx': [
    ['Project / Result Summary', ['Fantasy Field Management System']],
    ['Strongest Photo / Video', ['Build Video', 'Pictures']],
    ['Problem / Goal', ['What is this?']],
    ['Key Design Decisions', ['The Core Idea', 'Spellbooks', 'The Target', 'Server and Dashboard']],
    ['Testing / Results', ['Final Demo']],
    ['Constraints', ['Disclaimer']],
    ['Files / BOM', ['Project Files']],
  ],
  'fracture.mdx': [
    ['Project / Result Summary', ['Fracture']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['Features']],
    ['Problem / Goal', ['What is this?', 'Why?']],
    ['Constraints', ['Disclaimer']],
    ['Files / BOM', ['Project Files', 'BOM']],
    ['Development Log', ['Development Log', '12/23/2025 8:46 PM - Created the Specifications', '12/23/2025 8:52 PM - Finished the Schematic', '12/23/2025 8:57 PM - Finished the Layout', '12/23/2025 9:02 PM - Finished Routing the PCB', '12/23/2025 9:05 PM - Fixing a silly little mistake', '12/23/2025 9:13 PM - Panelization (The better way)', '12/23/2025 9:17 PM - Fixed ESP32 Color', '12/23/2025 9:33 PM - CADCADCAD', '12/26/2025 - Blender Renders', '12/28/2025 - Finished Firmware', '12/30/2025 - Added PCB art and cleaned up silkscreen + PCB Renders', '1/1/2026 - BOM and PCB Fab Prep']],
  ],
  'guardrail-fc.mdx': [
    ['Project / Result Summary', ['Guardrail FC - A Flight Assist that helps you not crash!']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['Features']],
    ['Problem / Goal', ['What is this?']],
    ['Constraints', ['Disclaimer']],
    ['How It Works', ['How It Works', 'Firmware']],
    ['Files / BOM', ['Project Files', 'BOM', 'Contributing']],
  ],
  'highway-to-undercity.mdx': [
    ['Project / Result Summary', ['Highway to Undercity: Reviewing + Staffing']],
    ['Strongest Photo / Video', ['Featured films', 'Photos']],
    ['At a Glance', ['Some Specifics']],
    ['Key Design Decisions', ['My Simple Undercity Project']],
  ],
  'horizon-driving.mdx': [
    ['Project / Result Summary', ['Horizon Driving – Buckle Up for High-Speed Action']],
    ['Strongest Photo / Video', ['Game Demo']],
    ['At a Glance', ['Awesome Features']],
    ['How It Works', ['How to Play']],
    ['Files / BOM', ['Project Files']],
    ['Development Log', ['Development Setup']],
  ],
  'mini-frc-robot.mdx': [
    ['Project / Result Summary', ['Makerspace 1 - Mini FRC Robot']],
    ['Key Design Decisions', ['Making the chassis', 'Electronics']],
    ['How It Works', ['Code']],
    ['Testing / Results', ['Frame Together', 'Put Together', 'Final Touches']],
    ['What Failed / What I Learned', ['Final Words']],
  ],
  'nif-t.mdx': [
    ['Project / Result Summary', ['Nif-T - An all in one smart home automation board']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['Features', 'Connectivity & IO', 'Pin Highlights (High-Level)']],
    ['Problem / Goal', ['What is this?', 'Why?']],
    ['Constraints', ['Disclaimer']],
    ['How It Works', ['How It Works']],
    ['Testing / Results', ['Project State']],
    ['Files / BOM', ['Project Files', 'BOM']],
  ],
  'orphbot.mdx': [
    ['Project / Result Summary', ['OrphBot']],
    ['At a Glance', ['Hardware']],
    ['Problem / Goal', ['A mini Terralift']],
    ['Key Design Decisions', ['Electronics']],
    ['How It Works', ['Software']],
    ['Files / BOM', ['Project files']],
  ],
  'pcb-fabrication.mdx': [
    ['Project / Result Summary', ['Makerspace 4 - PCB Fabrication']],
    ['Problem / Goal', ['The Plan']],
    ['Key Design Decisions', ['The UV Light Box (Structure)', 'The UV Light Box (Electronics)', 'The Game Console', 'The Game Console (Designer)', 'The Game Console (Schematic)', 'The Game Console (Layout)', 'The Game Console (Traces)', 'The Game Console (Final Touches)']],
    ['How It Works', ['The UV Light Box (Software)']],
    ['Testing / Results', ['Attempting to Make the PCB']],
    ['What Failed / What I Learned', ['Final Reflection']],
  ],
  'prism-cnc.mdx': [
    ['Project / Result Summary', ['Prism CNC']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['Features']],
    ['Problem / Goal', ['What is this?', 'Why?']],
    ['Constraints', ['Disclaimer']],
    ['Key Design Decisions', ['Structure', 'Design Process', 'Electronics']],
    ['Testing / Results', ['Project State', 'Future Plans']],
    ['Files / BOM', ['Project Files']],
  ],
  'retro-bluetooth-controller.mdx': [
    ['Project / Result Summary', ['Makerspace 3 - Retro Bluetooth Controller']],
    ['Problem / Goal', ['My Goal']],
    ['Key Design Decisions', ['CAD Model', '3D Printing', 'Electronics']],
    ['How It Works', ['Code']],
    ['Testing / Results', ['Final Product / Reflection']],
  ],
  'riptide.mdx': [
    ['Project / Result Summary', ['Riptide']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['What is this?']],
    ['Problem / Goal', ['Why?']],
    ['Constraints', ['Disclaimer']],
    ['How It Works', ['How It Works:']],
    ['Files / BOM', ['Project Files', 'BOM']],
    ['Development Log', ['How I built it:', 'Started work on keyboard layout and matrix', 'Fixed the keyboard matrix', 'LEDs and Infinite Expandability Support', 'Laying out LEDs + Encoder and OLED', 'Routing Time', 'Silkscreen Art', 'CAD time', 'Finished the CAD', 'Magic Keyboard Firmware', 'Blender my Glorious Goat']],
  ],
  'soupocalypse.mdx': [
    ['Project / Result Summary', ['Soupocalypse: The Last Bowl']],
    ['Strongest Photo / Video', ['Demo']],
    ['At a Glance', ['Results']],
    ['How It Works', ['How it works', 'Turning plushies into controllers', 'Making it feel like a game']],
    ['Files / BOM', ['Team & links']],
  ],
  'splashpad.mdx': [
    ['Project / Result Summary', ['SplashPad']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['What is this?']],
    ['Problem / Goal', ['Why?']],
    ['Constraints', ['The Biggest Challenge:', 'Disclaimer']],
    ['How It Works', ['How It Works:', 'How to Use:', 'LED Modes:']],
    ['Testing / Results', ['The Final Build:', 'Future Plans (Maybe):']],
    ['Files / BOM', ['Project Files', 'BOM']],
  ],
  'tadpoleFPV.mdx': [
    ['Project / Result Summary', ['Tadpole FPV Transmitter PCB']],
    ['Problem / Goal', ['Transmitter Concept and Part Selection']],
    ['Constraints', ['Power Section Issues and Redesign']],
    ['Key Design Decisions', ['Finalizing Transmitter Electronics', 'Starting the PCB Design in KiCAD', 'Finishing the Transmitter Schematic', 'PCB Layout and Routing', 'PCB Art']],
    ['Files / BOM', ['Project Files']],
  ],
  'terralift.mdx': [
    ['Project / Result Summary', ['Terralift']],
    ['At a Glance', ['Overview']],
    ['Problem / Goal', ['My Research Project']],
    ['Key Design Decisions', ['Design and Construction']],
    ['Testing / Results', ['Live Robot Testing']],
    ['Files / BOM', ['Project Files']],
  ],
  'yeastbound-rise-of-the-dough.mdx': [
    ['Project / Result Summary', ['Yeastbound: Rise of the Dough']],
    ['Strongest Photo / Video', ['Gameplay']],
    ['Testing / Results', ['Results']],
    ['What Failed / What I Learned', ['What I learned']],
    ['Files / BOM', ['Project Files', 'Play & source', 'Links']],
  ],
  'yuzu-pocket.mdx': [
    ['Project / Result Summary', ['Yuzu Pocket - A PCB Business card that runs Linux!']],
    ['Strongest Photo / Video', ['Renders']],
    ['At a Glance', ['Features', 'What Can It Run?']],
    ['Problem / Goal', ['What is this?', 'Why?']],
    ['Constraints', ['Disclaimer']],
    ['How It Works', ['How It Works', 'Firmware']],
    ['Files / BOM', ['Project Files', 'BOM', 'Contributing']],
  ],
};

function titleOf(block) {
  const match = block.match(/^#{1,2}[ \t]+(.+?)\s*$/m);
  return match?.[1] ?? null;
}

function nest(block) {
  return block.replace(/^(?:#|##)[ \t]+/, '### ');
}

for (const [fileName, plan] of Object.entries(groups)) {
  const filePath = path.join(contentDir, fileName);
  const source = fs.readFileSync(filePath, 'utf8');
  if (source.includes('## Project / Result Summary')) continue;
  const bodyStart = source.search(/^#{1,2}[ \t]+\S/m);
  if (bodyStart === -1) throw new Error(`No content headings found in ${fileName}`);

  const prefix = source.slice(0, bodyStart);
  const body = source.slice(bodyStart);
  const blocks = body.split(/(?=^#{1,2}[ \t]+\S)/m).filter(Boolean);
  const remaining = new Map();
  for (const block of blocks) {
    const title = titleOf(block);
    if (!title) throw new Error(`Could not identify a heading in ${fileName}`);
    if (remaining.has(title)) throw new Error(`Duplicate heading "${title}" in ${fileName}`);
    remaining.set(title, block);
  }

  const output = [];
  for (const [group, titles] of plan) {
    output.push(`## ${group}\n\n`);
    for (const title of titles) {
      const block = remaining.get(title);
      if (!block) throw new Error(`Missing heading "${title}" in ${fileName}`);
      output.push(nest(block));
      remaining.delete(title);
    }
  }

  if (remaining.size > 0) {
    throw new Error(`Unassigned headings in ${fileName}: ${[...remaining.keys()].join(', ')}`);
  }

  fs.writeFileSync(filePath, prefix + output.join(''), 'utf8');
}
